import { useState } from 'react';
import { Message } from '../../components/Message/Message';
import { Switch } from '../../components/Switch/Switch';
import { Title } from '../../components/Title/Title';
import styles from './Home.module.scss';
import { Bubble } from '../../components/Bubble/Bubble';

export const Home = () => {
	const [activePage, setActivePage] = useState(0);

	function toggleSwitch(index: number) {
		setActivePage(index);
	}

	return (
		<>
			<header className={styles.header}>
				<Title />
				<img
					className={styles.settings}
					src="/src/assets/setting.svg"
					alt="settings"
				/>
			</header>

			<main>
				<Switch
					titles={['Поиск', 'Задачи']}
					active={activePage}
					toggleSwitch={toggleSwitch}
				/>
				<Message
					isOwner={false}
					text={
						// eslint-disable-next-line max-len
						'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, nulla possimus nostrum delectus itaque repellat quisquam laborum totam recusandae doloribus vero reiciendis molestias architecto unde minima aperiam ipsum commodi autem.'
					}
				/>
				<div className={styles.bubbles}>
					<Bubble text="Я хочу есть, что можно быстро приготовить?" />
					<Bubble
						text="Я хочу посмотреть фильм, какой порекомендуешь? "
					/>
					<Bubble text='Напиши интересные факты о козах.'/>
				</div>
			</main>
			<footer>
				
			</footer>
		</>
	);
};
