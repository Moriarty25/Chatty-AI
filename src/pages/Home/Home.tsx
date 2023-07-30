import { useState } from 'react';
import { Message } from '../../components/Message/Message';
import { Switch } from '../../components/Switch/Switch';
import { Title } from '../../components/Title/Title';
import styles from './Home.module.scss';
import { Bubble } from '../../components/Bubble/Bubble';
import { useOpenai } from '../../services/openai';
import { FormSection } from '../../components/FormSection/FormSection';
import { v4 as uuidv4 } from 'uuid';

export const Home = () => {
	const [activePage, setActivePage] = useState(0);
	const { storedValues, generateResponse, status } = useOpenai();

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
			<Switch
				titles={['Поиск', 'Задачи']}
				active={activePage}
				toggleSwitch={toggleSwitch}
			/>
			<main className={styles.main}>
				<div className={styles.container}>
					{storedValues.map((value) => {
						return (
							<>
								<Message key={uuidv4()} isOwner={false} text={value.answer} />
								<Message key={uuidv4()} isOwner text={value.question} />
							</>
						);
					})}
				</div>
				<div className={styles.bubbles}>
					<Bubble text="Я хочу есть, что можно быстро приготовить?" />
					<Bubble text="Лучший документальный фильм о козах" />
					<Bubble text="Напиши интересные факты о козах." />
				</div>
			</main>
			<footer className={styles.footer}>
				<FormSection generateResponse={generateResponse} />
			</footer>
		</>
	);
};
