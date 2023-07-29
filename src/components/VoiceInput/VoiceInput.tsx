import { FC } from 'react'
import styles from './VoiceInput.module.scss'

type TVoiceInput = {
    active?: boolean
    disabled?: boolean
}

export const VoiceInput: FC<TVoiceInput> = ({active, disabled}) => {
	return (
		<div className={active ? `${styles.wrap} ${styles.active}` : 
			disabled ?  `${styles.wrap} ${styles.disabled}` :
				`${styles.wrap}` }>
			<img className={styles.micro} src="/src/assets/micro.svg" alt="voice-input" />
		</div>
	)
}
