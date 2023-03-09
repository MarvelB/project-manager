import './Sidebar.css';
// @ts-ignore: Cannot find module
import DashboardIcon from 'assets/dashboard_icon.svg';
// @ts-ignore: Cannot find module
import AddIcon from 'assets/add_icon.svg';
import { NavLink } from 'react-router-dom';

interface SidebarProps {}

const Sidebar = ({ }: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">

        <div className="user">
          {/* TODO: Avatar and user name */}
          <p>Hey user</p>
        </div>

        <nav className="links">

          <ul>

            <li>
              <NavLink exact to="/" >
                <img src={DashboardIcon} alt="dashboard" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/create" >
                <img src={AddIcon} alt="add project" />
                <span>New Project</span>
              </NavLink>
            </li>

          </ul>

        </nav>

      </div>
    </div>
  );
}

export default Sidebar;
