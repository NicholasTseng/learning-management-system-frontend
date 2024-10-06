import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Button } from 'antd';
import { LoginModal, useLoginModal } from '../LoginModal';
import Cookies from 'js-cookie';

export function Navbar() {
  const { openLoginModal, closeLoginModal, opened, logout } = useLoginModal();
  const token = Cookies.get('user_token');

  return (
    <>
      <LoginModal opened={opened} closeLoginModal={closeLoginModal} />
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/dashboard">LMS</Link>
        </div>
        <ul className={styles.navLinks}>
          {token && (
            <>
              <li>
                <Link to="/user">User Profile</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          )}
          <li>
            <Button type="primary" onClick={token ? logout : openLoginModal}>
              {token ? 'Logout' : 'Login'}
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
