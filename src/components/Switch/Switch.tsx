import { FC } from 'react'
import styles from './Switch.module.scss'

type TSwitchProps = {
    titles: string[]
    active: number
    toggleSwitch: (index: number) => void
}

export const Switch: FC<TSwitchProps> = ({titles, active, toggleSwitch}) => {
    
	return (
		<div className={styles.switch}>
			{titles.map((title, index) => {
				return (
					<div key={title + index} 
						className={active === index ?
							`${styles.item} ${styles.active}` :
							`${styles.item}`}
						onClick={() => {toggleSwitch(index)}}
					>
						<span>{title}</span>
					</div>
				)
			})
			}
		</div>
	)
}
