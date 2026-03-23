import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
    const location = useLocation();

    // Функция для проверки активности ссылки
    const isActive = (path) => location.pathname === path;

    return (
        <nav className={styles.nav}>
            <Link 
                to="/generate" 
                className={`${styles.link} ${isActive('/generate') ? styles.active : ''}`}
            >
                Генерировать
            </Link>
            <Link 
                to="/scan" 
                className={`${styles.link} ${isActive('/scan') ? styles.active : ''}`}
            >
                Сканировать
            </Link>
            <Link 
                to="/generateHistory" 
                className={`${styles.link} ${isActive('/generateHistory') ? styles.active : ''}`}
            >
                История генерации
            </Link>
            <Link 
                to="/scanHistory" 
                className={`${styles.link} ${isActive('/scanHistory') ? styles.active : ''}`}
            >
                История сканирования
            </Link>
        </nav>
    );
}