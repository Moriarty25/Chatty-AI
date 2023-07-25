import { FC } from 'react'
import styles from './AnswerSection.module.scss'

type TAnswerSectionProps = {
  storedValues: Array<TStoredValues>;
};

export type TStoredValues = {
  question: string
  answer: string | undefined
}

export const AnswerSection: FC<TAnswerSectionProps> = ({ storedValues }) => {

	function speakHandler(index: number) {        
		if (storedValues[index].answer !== undefined) {
			const message =  new SpeechSynthesisUtterance()
			message.lang = 'ru-RU'
			console.log(storedValues)
            
			message.text = storedValues[index].answer as string
			window.speechSynthesis.speak(message)
		}
	}
    
	return (
		<>
			{/* <hr className="hr-line" /> */}
			<div className={styles.container}>
				{storedValues.map((value, index) => {
					return (
						<div className={styles.section} key={index}>
							<p className={styles.question}>
								{value.question}
							</p>
							<p className={styles.answer}>
								{value.answer}
							</p>
							<div 
								className={styles.speaker} 
								onClick={() => speakHandler(index)}
							>
								<svg  fill="none" className={styles.speaker_icon} 
									viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" 
										d="M19.114 5.636a9 9 0 010 12.728M16.463 
                                    8.288a5.25 5.25 0 010 
                                    7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 
                                    01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 
                                    9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25
                                     4.51 8.25H6.75z" />
								</svg>

							</div>
							<div className="copy-icon">
								<i className="fa-solid fa-copy">32</i>
							</div>
						</div>
					)
				})
				}
			</div>
		</>
	);
};
