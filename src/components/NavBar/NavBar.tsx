import './NavBar.css';
// // @ts-ignore: Cannot find module
// import Temple from 'assets/temple.svg';
import { Link } from 'react-router-dom';
import { useLogout } from 'hooks/useLogout';

interface NavBarProps {}

const NavBar = ({ }: NavBarProps) => {

  const { isLoading, logout } = useLogout();

  return (
    <nav className="navbar">
      <ul>

        <li className="logo">

          <span>Project Manager</span>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/signup">Signup</Link>
        </li>

        <li>
          <button
            className="btn"
            onClick={logout}
            disabled={isLoading}
          >{isLoading ? "Logging out..." : "Logout"}</button>
        </li>

      </ul>
    </nav>
  );
}

export default NavBar;
