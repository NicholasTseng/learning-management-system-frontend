import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { Button } from 'antd';
import { LoginModal, useLoginModal } from '../LoginModal';

export function Navbar() {
  const { openLoginModal, closeLoginModal, opened } = useLoginModal();

  return (
    <>
      <LoginModal opened={opened} closeLoginModal={closeLoginModal} />
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">LMS</Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Button type="primary" onClick={openLoginModal}>
              Login
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
