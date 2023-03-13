import './NavBar.css';
// // @ts-ignore: Cannot find module
// import Temple from 'assets/temple.svg';
import { Link } from 'react-router-dom';
import { useLogout } from 'hooks/useLogout';
import { useAuthContext } from 'hooks/useAuthContext';

interface NavBarProps {}

const NavBar = ({ }: NavBarProps) => {

  const { isLoading, logout } = useLogout();

  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <ul>

        <li className="logo">

          <span>Project Manager</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button
              className="btn"
              onClick={logout}
              disabled={isLoading}
            >{isLoading ? "Logging out..." : "Logout"}</button>
          </li>
        )}

      </ul>
    </nav>
  );
}

export default NavBar;
