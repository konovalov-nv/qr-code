import { QRCodeSVG } from 'qrcode.react'
import { SCAN_DATA } from '../../constants'
import styles from './ScanHistory.module.css'

export default function ScanHistory() {
    const data = JSON.parse(localStorage.getItem(SCAN_DATA) || '[]')

    return (
        <div className={styles.container}>
            {data.length === 0 && (
                <p className={styles.empty}>История сканирования пуста</p>
            )}
            
            {data.map((text, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.qrWrapper}>
                        <QRCodeSVG value={text} size={100} />
                    </div>
                    <p className={styles.text} title={text}>
                        {text}
                    </p>
                </div>
            ))}
        </div>
    )
}