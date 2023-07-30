
import { FC } from 'react'
import styles from './Title.module.scss'

type TTitleProps = {
    text?: string
}

export const Title: FC<TTitleProps> = ({text='Chatty AI'}) => {
	return (
		<div>
			<span className={styles.title}>{text}</span>
		</div>
	)
}