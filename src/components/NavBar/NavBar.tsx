import './NavBar.css';
// // @ts-ignore: Cannot find module
// import Temple from 'assets/temple.svg';
import { Link } from 'react-router-dom';

interface NavBarProps {}

const NavBar = ({ }: NavBarProps) => {
  return (
    <nav className="navbar">
      <ul>

        <li className="logo">
          {/* <img src={Temple} alt="dojo" /> */}
          <span>Project Manager</span>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/signup">Signup</Link>
        </li>

        <li className="btn">Logout</li>

      </ul>
    </nav>
  );
}

export default NavBar;
