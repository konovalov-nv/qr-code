import { Scanner } from '@yudiel/react-qr-scanner';
import { useState, useCallback } from 'react';
import styles from './qrCodeScanner.module.css';
import { SCAN_DATA } from '../../constants'

export default function QRCodeScanner() {
    const [scanned, setScanned] = useState(null);
    const [error, setError] = useState(null);
    const [scanKey, setScanKey] = useState(0);

    const scanHandler = useCallback((result) => {
        if (result && result[0]?.rawValue) {
            const newValue = result[0].rawValue;
            
            setScanned((prev) => {
                if (prev !== newValue) {
                    return newValue;
                }
                return prev;
            });
            const prevData = JSON.parse(localStorage.getItem(SCAN_DATA) || '[]')
            localStorage.setItem(
                SCAN_DATA,
                JSON.stringify([...prevData, newValue]))

            setError(null);
            
            setTimeout(() => {
                setScanKey((prev) => prev + 1);
            }, 500);
        }
    }, []);

    const errorHandler = (err) => {
        setError('Ошибка сканирования: ' + err.message);
        setScanned(null);
    };

    const onClear = () => {
        setScanned(null);
        setError(null);
        setScanKey((prev) => prev + 1);
    };

    const settings = {
        audio: false,
        finder: false,
    };

    const customStyles = {
        container: { 
            width: '100%', 
            borderRadius: '12px',
        },
        video: { 
            width: '100%', 
            height: 'auto' 
        },
    };

    return (
        <div className={styles['qr-scanner']}>
            <h2 className={styles['qr-scanner__title']}>Сканер QR-кода</h2>
            
            <div className={styles['qr-scanner__camera-wrapper']}>
                <Scanner
                    key={scanKey}
                    onScan={scanHandler}
                    onError={errorHandler}
                    components={settings}
                    styles={customStyles}
                />
            </div>

            {error && (
                <div className={styles['qr-scanner__error']}>
                    <span className={styles['qr-scanner__error-icon']}>⚠️</span>
                    {error}
                </div>
            )}

            {scanned && (
                <div className={styles['qr-scanner__result']}>
                    <p className={styles['qr-scanner__result-label']}>Отсканировано:</p>
                    <code className={styles['qr-scanner__code']}>{scanned}</code>
                    
                    <div className={styles['qr-scanner__actions']}>
                        <button 
                            className={styles['qr-scanner__button']}
                            onClick={() => navigator.clipboard.writeText(scanned)}
                        >
                            Копировать
                        </button>
                        <button 
                            className={`${styles['qr-scanner__button']} ${styles['qr-scanner__button--secondary']}`}
                            onClick={onClear}
                        >
                            Очистить
                        </button>
                    </div>
                </div>
            )}

            <p className={styles['qr-scanner__hint']}>
                Разрешите доступ к камере для сканирования
            </p>
        </div>
    );
}