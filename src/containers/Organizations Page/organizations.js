import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faShoppingCart, faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function Organizations() {
  const [name, setName] = useState('');
  const [totalCustomers, setTotalCustomers] = useState();
  const [lastName, setLastName] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4); // Initially show 4 items

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedLastName = localStorage.getItem('lastName');

    if (storedName && storedLastName) {
      setName(storedName);
      setLastName(storedLastName);
    }

    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const token = localStorage.getItem('token');
      const organisation = localStorage.getItem('organisation');
      console.log('organisation:', organisation);
      const url = 'https://hta.hatimtechnologies.in/api/customer/getAllCustomersForOrgainsationAdmin';

      const body = {
        userType: 'costomer',
        organisation: organisation,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }
      const data = await response.json();
      console.log('Server response:', data);
      const { allCustomer } = data;
      setTotalCustomers(allCustomer.length);
      setCustomerData(allCustomer);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleShowMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 5); // Increase by 5 items
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const boxesData = [
    { title: "Total Customers", number: totalCustomers },
    { title: "Total Sales", number: 500 },
    { title: "New Orders", number: 200 },
    { title: "Revenue", number: 10000 },
    { title: "Products Sold", number: 300 },
    { title: "Pending Orders", number: 50 },
    { title: "Average Rating", number: 4.5 },
    { title: "Visitors Today", number: 1500 }
  ];

  return (
    <>
      <div className="wrapper">
      <div className="menu-container">
          <div className="menu-header">
            <div className="title">
              <span className="app-title">HTA</span>
            </div>
          </div>
          <div className="menu-container2">
            <ul className="menu">
              <li><a href="/dashboard" ><FontAwesomeIcon icon={faTachometerAlt} className="icon" />Dashboard</a></li>
              <li><a href="#" className="active"><FontAwesomeIcon icon={faUsers} className="icon" />Organizations</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faChartBar} className="icon" />Reports</a></li>
              <li><a href="#"><FontAwesomeIcon icon={faCog} className="icon" />Settings</a></li>
            </ul>
            <div className="logout-container">
              <button className="logout-button" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} className="icon" />Logout</button>
            </div>
          </div>
          </div>
        
        <div className="main-content">
          <div className="header">
            <div className="left-section">
              <span className="customers-text">Customers</span>
            </div>
            <div className="right-section">
              <div className="profile-info">
                <img src="/Images/profile_pic.jpg" alt="Profile Pic" className="profile-avatar" />
                <span className="user-name">{name} {lastName}</span>
              </div>
            </div>
          </div>
          <div className="boxes-container">
            <div className="box-row">
              {boxesData.slice(0, 4).map((box, index) => (
                <div className="box" key={index} style={{ backgroundColor: box.color }}>
                  <div className="box-content">
                    <span className="number">{box.number}</span>
                    <span className="title">{box.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="box-row">
              {boxesData.slice(4, 8).map((box, index) => (
                <div className="box" key={index + 4} style={{ backgroundColor: box.color }}>
                  <div className="box-content">
                    <span className="number">{box.number}</span>
                    <span className="title">{box.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="big-box">
              <div className="big-box-header">
                <h2>Organization</h2>
                {visibleItems < customerData.length && (
                  <button className="show-more-button" onClick={handleShowMore}>Show More</button>
                )}
              </div>
              <div className="big-box-content">
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Mobile Number</th>
                        <th>Location</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerData.slice(0, visibleItems).map((customer, index) => (
                        <tr key={index}>
                          <td>{customer.name}</td>
                          <td>{customer.mobileNumber}</td>
                          <td>{customer.location}</td>
                          <td>{customer.status ? "Active" : "Inactive"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Organizations;
