import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faShoppingCart, faChartBar, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Menu({ handleLogout, name, lastName }) {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <div className="title">
          <span className="app-title">HTA</span>
        </div>
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to="/dashboard" className="active">
              <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/customers">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              Customers
            </Link>
          </li>
          <li>
            <Link to="#">
              <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              Products
            </Link>
          </li>
          <li>
            <Link to="#">
              <FontAwesomeIcon icon={faChartBar} className="icon" />
              Reports
            </Link>
          </li>
          <li>
            <Link to="#">
              <FontAwesomeIcon icon={faCog} className="icon" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Menu;