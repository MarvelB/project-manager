import Avatar from 'components/Avatar/Avatar';
import { useCollection } from 'hooks/useCollection';
import { UserModelWithId } from 'types';
import './UsersSideBar.css';

interface UsersSideBarProps {}

const UsersSideBar = ({ }: UsersSideBarProps) => {

  const { documents: users, error } = useCollection<UserModelWithId>("users");

  return (
    <div className="user-list">
      <h2>All Users</h2>

      {error && <div className="error">{error}</div>}

      {users && users.map(user => (
        <div key={user.id} className="user-list-item">
          {user.signedIn && <span className="online-user"></span>}
          <span>{user.displayName}</span>
          <Avatar imageSrc={user.photoURL} />
        </div>
      ))}

    </div>
  );
}

export default UsersSideBar;
