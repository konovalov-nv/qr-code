import { GENERATE_DATA } from '../../constants'
import { QRCodeSVG } from 'qrcode.react'
import styles from './GenerateHistory.module.css'

export default function GenerateHistory() {
    const data = JSON.parse(localStorage.getItem(GENERATE_DATA) || '[]')

    return (
        <div className={styles.container}>
            {data.length === 0 && (
                <p className={styles.empty}>История генерации пуста</p>
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