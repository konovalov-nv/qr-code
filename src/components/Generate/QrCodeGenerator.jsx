import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './qrCodeGenerator.module.css';
import { GENERATE_DATA } from '../../constants'

export default function QrCodeGenerator() {
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const onClickHandler = () => {
        const prevData = JSON.parse(localStorage.getItem(GENERATE_DATA) || '[]')
        localStorage.setItem(
            GENERATE_DATA,
            JSON.stringify([...prevData, value]))

        if (value.trim()) {
            setResult(value.trim());
            setValue('');
        }
    };

    const onChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const onKeyDownHandler = (event) => {
        if (event.key === 'Enter') {
            onClickHandler();
        }
    };

    return (
        <div className={styles['qr-generator']}>
            <h2 className={styles['qr-generator__title']}>Генератор QR-кода</h2>
            
            <div className={styles['qr-generator__input-wrapper']}>
                <input
                    type="text"
                    value={value}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={styles['qr-generator__input']}
                    placeholder="Введите текст или ссылку..."
                    maxLength={500}
                />
                <button 
                    type="button" 
                    onClick={onClickHandler}
                    className={styles['qr-generator__button']}
                    disabled={!value.trim()}
                >
                    Создать
                </button>
            </div>

            {result && (
                <div className={styles['qr-generator__qr-wrapper']}>
                    <QRCodeSVG 
                        value={result} 
                        size={200}
                    />
                </div>
            )}

            {result && (
                <p className={styles['qr-generator__hint']}>
                    Содержимое: <strong>{result.length > 30 ? result.slice(0, 30) + '...' : result}</strong>
                </p>
            )}
        </div>
    );
}