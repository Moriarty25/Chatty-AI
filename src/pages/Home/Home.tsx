import { useState } from 'react';
import { Message } from '../../components/Message/Message';
import { Switch } from '../../components/Switch/Switch';
import { Title } from '../../components/Title/Title';
import styles from './Home.module.scss';
import { Bubble } from '../../components/Bubble/Bubble';
import { Input } from '../../components/Input/Input';
import { VoiceInput } from '../../components/VoiceInput/VoiceInput';

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

			<main className={styles.main}>
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
					<Bubble text="Лучший документальный фильм о козах" />
					<Bubble text="Напиши интересные факты о козах." />
				</div>
			</main>
			<footer className={styles.footer}>
				<div className={styles.control}>
					<Input placeholder="Сообщение" />
					<img className={styles.send} src="/src/assets/send.svg" alt="send" />
				</div>
				<div className={styles.voice}>
					<div className={styles.inner}>
						<VoiceInput />
						<img
							className={styles.keyboard}
							src="/src/assets/keyboard.svg"
							alt="keyboard"
						/>
					</div>
				</div>
			</footer>
		</>
	);
};
