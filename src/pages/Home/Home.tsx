import { useState } from 'react';
import { Message } from '../../components/Message/Message';
import { Switch } from '../../components/Switch/Switch';
import { Title } from '../../components/Title/Title';
import styles from './Home.module.scss';
import { Bubble } from '../../components/Bubble/Bubble';
import { VoiceInput } from '../../components/VoiceInput/VoiceInput';
import { useOpenai } from '../../services/openai';
import { FormSection } from '../../components/FormSection/FormSection';

export const Home = () => {
	const [activePage, setActivePage] = useState(0);

	function toggleSwitch(index: number) {
		setActivePage(index);
	}
	const {storedValues, generateResponse, status} = useOpenai()
	console.log(status);
	
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
					{storedValues.map((value, index) => {
						return (
							<>
								<Message key={index} isOwner={false} text={value.answer}/>
								<Message key={index} isOwner text={value.question}/>
							</>
						)
					})}
				</div>
				<div className={styles.bubbles}>
					<Bubble text="Я хочу есть, что можно быстро приготовить?" />
					<Bubble text="Лучший документальный фильм о козах" />
					<Bubble text="Напиши интересные факты о козах." />
				</div>
			</main>
			<footer className={styles.footer}>
				<FormSection generateResponse={generateResponse}/>
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
