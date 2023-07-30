import { FC, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

type TInputProps = {
    placeholder: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<TInputProps> = ({type='text', placeholder, ...attrs}) => {
	return (
		<input className={styles.input} placeholder={placeholder} type={type} {...attrs}/>
	)
}
