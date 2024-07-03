import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faShoppingCart, faChartBar, faCog, faSignOutAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function Dashboard() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [boxesData, setBoxesData] = useState([

    { title: "Organizations", number: 0 },
    { title: "Customers", number: 0 }, 
    { title: "Bill Raised Today", number: 0 },
    { title: "Amount Collected Today", number: 0 },
    { title: "Bill Raised This Month", number: 0 },
    { title: "Amount Collected This Month", number: 0 },
    { title: "Bill Raised This Year", number: 0 },
    { title: "Amount Collected This Year", number: 0 },
    
    
  ]);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedLastName = localStorage.getItem('lastName');

    if (storedName && storedLastName) {
      setName(storedName);
      setLastName(storedLastName);
    }
  }, []);

  useEffect(() => {
    fetchCustomerNumberCount();
    fetchCustomerDashboard();
  }, []);

  const fetchCustomerNumberCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = 'https://hta.hatimtechnologies.in/api/dashboard/getOrganizationsWithCustomerCounts';

      const body = {};

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
      console.log('Organizations response:', data);

      

      setBoxesData(prevBoxesData => {
        const newBoxesData = [...prevBoxesData];
        
        return newBoxesData;
      });

      // Format data as per your requirement
      const formattedData = data.organizationsWithCustomerCounts.map(org => ({
        organizationName: org.organizationDetails.OrganisationName,
        adminName: '-', // Dash as requested
        mobileNumber: org.organizationDetails.OrganisationContact,
        location: '-', // Dash as requested
        status: org.organizationDetails.isBlockedBySuperAdmin ? 'Inactive' : 'Active',
        customerCount: org.customerCount // Add customer count here
      }));

      console.log('Formatted data:', formattedData);
      setCustomerData(formattedData);

    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const fetchCustomerDashboard = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = 'https://hta.hatimtechnologies.in/api/dashboard/getDashboardForSuperAdmin';

      const body = {};

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      console.log('Dashboard response:', data);

      const { customers, organisations, thisYear, thisMonth, today } = data.report;

      setBoxesData(prevBoxesData => {
        const newBoxesData = [...prevBoxesData];
        newBoxesData[0].number = organisations;
        newBoxesData[1].number = customers;       
        newBoxesData[2].number = today.billRaised;
        newBoxesData[3].number = today.amountCollected;
        newBoxesData[4].number = thisMonth.billRaised;
        newBoxesData[5].number = thisMonth.amountCollected;
        newBoxesData[6].number = thisYear.billRaised;
        newBoxesData[7].number = thisYear.amountCollected;
        
        
        return newBoxesData;
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

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
              <li><a href="#" className="active"><FontAwesomeIcon icon={faTachometerAlt} className="icon" />Dashboard</a></li>
              <li><a href="/organizations"><FontAwesomeIcon icon={faUsers} className="icon" />Organizations</a></li>
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
              <span className="dashboard-text">Dashboard</span>
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
          </div>
          <div className="big-box">
      <div className="big-box-content">
        <h2>Organization</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Admin Name</th>
                <th>Mobile Number</th>
                <th>Location</th>
                <th>Customer Numbers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.organizationName}</td>
                  <td>{customer.adminName}</td>
                  <td>{customer.mobileNumber}</td>
                  <td>{customer.location}</td>
                  <td className="customer-numbers">{customer.customerCount}</td>
                  <td className="actions">
                    <button className={`action-button circle ${customer.status === 'Active' ? 'green-circle' : 'red-circle'}`}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </button>
                    <button className="action-button view">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
