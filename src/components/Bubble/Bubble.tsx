import { FC } from 'react';
import styles from './Bubble.module.scss';

type TBubbleProps = {
  text: string;
  onClick?: (text: string) => void
}

export const Bubble: FC<TBubbleProps> = ({ text }) => {
	return (
		<div className={styles.bubble}>
			<div className={styles.content}>{text}</div>
		</div>
	);
};
