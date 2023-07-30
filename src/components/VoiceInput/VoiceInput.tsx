import { FC } from 'react'
import styles from './VoiceInput.module.scss'

type TVoiceInput = {
    active?: boolean
    disabled?: boolean
	onClick?: () => void
}

export const VoiceInput: FC<TVoiceInput> = ({active, disabled, onClick}) => {
	return (
		<div className={active ? `${styles.wrap} ${styles.active}` : 
			disabled ?  `${styles.wrap} ${styles.disabled}` :
				`${styles.wrap}` }
		onClick={onClick}>
			<img className={styles.micro} src="/src/assets/micro.svg" alt="voice-input" />
		</div>
	)
}
