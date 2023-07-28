import { useState } from 'react'
import { Message } from '../../components/Message/Message'
import { Switch } from '../../components/Switch/Switch'
import { Title } from '../../components/Title/Title'
import styles from './Home.module.scss'

export const Home = () => {

	const [activePage, setActivePage] = useState(0)

	function toggleSwitch(index: number) {
		setActivePage(index)
	}
    
	return (
		<>
			<header className={styles.header}>
				<Title/>
				<img className={styles.settings} src="/src/assets/setting.svg" alt="settings" />
			</header>
			
			<main>
				<Switch 
					titles={['Поиск', 'Задачи']} 
					active={activePage} 
					toggleSwitch={toggleSwitch}
				/>
				<Message isOwner={false} text={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque, nulla possimus nostrum delectus itaque repellat quisquam laborum totam recusandae doloribus vero reiciendis molestias architecto unde minima aperiam ipsum commodi autem.'}/>
			</main>
		</>
	)
}
