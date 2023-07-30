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
	const { storedValues, generateResponse } = useOpenai();

	function toggleSwitch(index: number) {
		setActivePage(index);
	}

	return (
		<>
			<header className={styles.header}>
				<Title />
				<svg
					className={styles.settings}
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M22.9196 7.82215C22.9196 6.43065 21.9026 
					5.24805 20.5268 5.03967C20.1776 4.98678 19.8224 4.98678 19.4732 
					5.03967C18.0974 5.24805 17.0804 6.43066 17.0804 
					7.82217V9.78995C16.2944 10.0143 15.5456 10.327 14.8454 
					10.7165L13.4534 9.32451C12.4695 8.34058 10.9141 8.22346 
					9.79396 9.04895C9.50963 9.25848 9.25848 9.50963 9.04895 
					9.79396C8.22345 10.9142 8.34056 12.4695 9.32451 13.4534L10.7165 
					14.8455C10.327 15.5456 10.0143 16.2944 9.78994 17.0804H7.82216C6.43065 
					17.0804 5.24805 18.0974 5.03967 19.4732C4.98678 19.8224 4.98678 20.1776 
					5.03967 20.5268C5.24805 21.9026 6.43065 22.9196 7.82215 
					22.9196H9.78994C10.0143 23.7056 10.327 24.4544 10.7165 
					25.1546L9.32452 26.5466C8.34057 27.5305 8.22345 29.0859 
					9.04895 30.2061C9.25848 30.4904 9.50963 30.7415 9.79397 
					30.9511C10.9142 31.7766 12.4695 31.6594 13.4534 30.6755L14.8454 29.2835C15.5456 
					29.6731 16.2944 29.9857 17.0804 30.2101V32.1778C17.0804 33.5694 18.0974
					34.752 19.4732 34.9603C19.8224 35.0132 20.1776 35.0132 20.5268 34.9603C21.9026
					 34.752 22.9196 33.5694 22.9196 32.1779V30.2101C23.7056 29.9857 24.4544 29.6731
					  25.1546 29.2835L26.5466 30.6755C27.5305 31.6595 29.0859 31.7766 30.2061 
					  30.9511C30.4904 30.7415 30.7415 30.4904 30.9511 30.2061C31.7766 
					  29.0859 31.6594 
					  27.5305 30.6755 26.5466L29.2835 25.1546C29.6731 24.4544 29.9857 23.7056 
					  30.2101 22.9196H32.1779C33.5694 22.9196 34.752 21.9026 34.9603 
					  20.5268C35.0132 
					  20.1776 35.0132 19.8224 34.9603 19.4732C34.752 18.0974
					   33.5694 17.0804 32.1778 17.0804H30.2101C29.9857 16.2944 
					   29.6731 15.5456 29.2835 14.8454L30.6755 13.4534C31.6594 
					   12.4695 31.7766 10.9142 30.9511 9.79396C30.7415 9.50963 
					   30.4904 9.25848 30.2061 9.04895C29.0859 8.22345 27.5305 
					   8.34056 26.5466 9.32451L25.1546 10.7165C24.4544 10.327 
					   23.7056 10.0143 22.9196 9.78994V7.82215Z"
						stroke="#2D2F30"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M15.8335 19.9999C15.8335 17.6987 17.699 15.8333 20.0002 
					15.8333C22.3013 15.8333 24.1668 17.6987 24.1668 19.9999C24.1668 22.3011 
					22.3013 24.1666 20.0002 24.1666C17.699 24.1666 15.8335 22.3011 15.8335 
					19.9999Z"
						stroke="#2D2F30"
						stroke-width="2.5"
					/>
				</svg>
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
