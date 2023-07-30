import { FC } from 'react'
import styles from './Message.module.scss'

type TMessageProps = {
    text?: string
    isOwner: boolean
}

export const Message: FC<TMessageProps> = ({text, isOwner}) => {
	return (
		<>
			<div className={isOwner ? `${styles.message} ${styles.question}` : `${styles.message}`}>
				<p>
					{text}
				</p>
				{!isOwner && <svg className={styles.arrow} width="17" height="21" 
					viewBox="0 0 17 21" fill='none' stroke="currentColor">
					<path d="M0.11315 20.1846C5.31315 20.9846 10.4465 18.1212 12.1132 
                    16.2879C10.3953 12.1914 21.0011 2.24186 14.0011 2.24148C12.3825 2.24148 11 
                    -1.9986 5.11315 1.1846C5.09194 2.47144 5.11315 6.92582 5.11315 7.6842C5.11315 
                    18.1842 -0.88685 19.5813 0.11315 20.1846Z" fill='#E9E9EB'
					/>
				</svg>}
			</div>
			
		</>
	)
}