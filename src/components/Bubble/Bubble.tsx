import { FC } from 'react';
import styles from './Bubble.module.scss';

type TBubbleProps = {
  text: string;
};

export const Bubble: FC<TBubbleProps> = ({ text }) => {
	return (
		<div className={styles.bubble}>
			<p className={styles.content}>{text}</p>
		</div>
	);
};
