import { FC, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

type TButtonProps = {
    text: string
    view: 'primary' | 'secondary'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<TButtonProps> = ({text, view, type='button', ...attrs}) => {
	return (
		<button 
			type={type}
			{...attrs}
			className={
				view === 'primary' ?
					`${styles.button} ${styles.primary}` :
					`${styles.button} ${styles.secondary}`
			}
		>
			{text}
		</button>
	)
}
