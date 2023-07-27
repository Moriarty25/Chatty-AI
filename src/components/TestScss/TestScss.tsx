import React, {FC} from 'react'
import styles from './TestScss.module.scss'

type TTestScssProps = {
  text: string
	text: string
}

export const TestScss: FC<TTestScssProps> = ({text}) => {

	return (
		<p className={styles.paragraph}>{text}</p>
	)
}
