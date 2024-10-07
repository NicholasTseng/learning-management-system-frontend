import { Navbar } from '../../components';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.banner}>
        <h1>Welcome to the Learning Management System</h1>
        <p>Explore our courses and start learning today!</p>
      </div>
    </div>
  );
}
