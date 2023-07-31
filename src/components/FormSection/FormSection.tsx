/* eslint-disable max-len */
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './FormSection.module.scss';
import { Input } from '../Input/Input';
import { VoiceInput } from '../VoiceInput/VoiceInput';

type TFormSectionProps = {
  generateResponse: (
    newQuestion: string,
    setNewQuestion: Dispatch<SetStateAction<string>>
  ) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognition: any = null;
if ('webkitSpeechRecognition' in window) {
	recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.lang = 'ru' || 'en-US';
}

export const FormSection: FC<TFormSectionProps> = ({ generateResponse }) => {
	
	const [isRecording, setIsRecording] = useState(false)
	const [newQuestion, setNewQuestion] = useState('');

	useEffect(() => {
		if (!recognition) return;

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			setNewQuestion(event.results[0][0].transcript)
            
		};
		recognition.stop();
		setIsRecording(false);
	}, []);

	const startRecording = () => {
		setNewQuestion('');
		setIsRecording(true);
		recognition.start();
	};

	const stopRecording = () => {
		setIsRecording(false);
		recognition.stop();
	};
	
	const handleClickStartListening = () => {
		if (!isRecording) {
			startRecording()
			
		} else {
			
			stopRecording()

		}

		console.log(isRecording, 'req', newQuestion);
	}

	function onOpenaiHandler() {
		if (!newQuestion) return
		generateResponse(newQuestion, setNewQuestion)
	}

	return (
		<>
			<div className={styles.control}>
				<Input
					placeholder="Сообщение"
					value={newQuestion}
					onChange={(e) => setNewQuestion(e.target.value)}
				/>
				<svg className={styles.svg} onClick={onOpenaiHandler} width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.93072 15.0266L1.91073 21.7434C0.634092 25.9885 4.77831 29.7789 8.51983 27.7883L24.0514 19.5251C27.5352 17.6716 27.539 12.3736 24.0579 10.5145L8.51805 2.21533C4.77853 0.218215 0.628391 4.00397 1.90092 8.25147L3.93072 15.0266ZM3.93072 15.0266H8.88239" stroke="#4584FF" stroke-width="2.5" stroke-linecap="round"/>
				</svg>

			</div>
			<div className={styles.voice}>
				<div className={styles.inner}>
					<VoiceInput
						onClick={handleClickStartListening}
						active={isRecording}
					/>
					<svg className={styles.keyboard} width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.3841 4.78564H19.6163C22.4819 4.78564 23.521 5.08401 24.5686 5.64429C25.6163 6.20456 26.4384 7.02674 26.9987 8.07435C27.559 9.12197 27.8574 10.1611 27.8574 13.0267V17.9732C27.8574 20.8388 27.559 21.8779 26.9987 22.9255C26.4384 23.9731 25.6163 24.7953 24.5686 25.3556C23.521 25.9158 22.4819 26.2142 19.6163 26.2142H10.3841C7.51853 26.2142 6.4794 25.9158 5.43178 25.3556C4.38416 24.7953 3.56198 23.9731 3.00171 22.9255C2.44143 21.8779 2.14307 20.8388 2.14307 17.9732V13.0267C2.14307 10.1611 2.44143 9.12197 3.00171 8.07435C3.56198 7.02674 4.38416 6.20456 5.43178 5.64429C6.4794 5.08401 7.51853 4.78564 10.3841 4.78564ZM10.3841 6.9285C8.095 6.9285 7.28005 7.08587 6.44235 7.53388C5.76816 7.89444 5.25187 8.41074 4.89131 9.08492C4.4433 9.92263 4.28592 10.7376 4.28592 13.0267V17.9732C4.28592 20.2623 4.4433 21.0772 4.89131 21.9149C5.25187 22.5891 5.76816 23.1054 6.44235 23.466C7.28005 23.914 8.095 24.0714 10.3841 24.0714H19.6163C21.9054 24.0714 22.7204 23.914 23.5581 23.466C24.2323 23.1054 24.7486 22.5891 25.1091 21.9149C25.5571 21.0772 25.7145 20.2623 25.7145 17.9732V13.0267C25.7145 10.7376 25.5571 9.92263 25.1091 9.08492C24.7486 8.41074 24.2323 7.89444 23.5581 7.53388C22.7204 7.08587 21.9054 6.9285 19.6163 6.9285H10.3841ZM8.57164 12.8214C7.68404 12.8214 6.9645 12.1018 6.9645 11.2142C6.9645 10.3266 7.68404 9.60707 8.57164 9.60707C9.45924 9.60707 10.1788 10.3266 10.1788 11.2142C10.1788 12.1018 9.45924 12.8214 8.57164 12.8214ZM12.8574 12.8214C11.9698 12.8214 11.2502 12.1018 11.2502 11.2142C11.2502 10.3266 11.9698 9.60707 12.8574 9.60707C13.745 9.60707 14.4645 10.3266 14.4645 11.2142C14.4645 12.1018 13.745 12.8214 12.8574 12.8214ZM17.1431 12.8214C16.2555 12.8214 15.5359 12.1018 15.5359 11.2142C15.5359 10.3266 16.2555 9.60707 17.1431 9.60707C18.0307 9.60707 18.7502 10.3266 18.7502 11.2142C18.7502 12.1018 18.0307 12.8214 17.1431 12.8214ZM21.4288 12.8214C20.5412 12.8214 19.8216 12.1018 19.8216 11.2142C19.8216 10.3266 20.5412 9.60707 21.4288 9.60707C22.3164 9.60707 23.0359 10.3266 23.0359 11.2142C23.0359 12.1018 22.3164 12.8214 21.4288 12.8214ZM21.4288 17.6428C20.5412 17.6428 19.8216 16.9232 19.8216 16.0356C19.8216 15.148 20.5412 14.4285 21.4288 14.4285C22.3164 14.4285 23.0359 15.148 23.0359 16.0356C23.0359 16.9232 22.3164 17.6428 21.4288 17.6428ZM17.1431 17.6428C16.2555 17.6428 15.5359 16.9232 15.5359 16.0356C15.5359 15.148 16.2555 14.4285 17.1431 14.4285C18.0307 14.4285 18.7502 15.148 18.7502 16.0356C18.7502 16.9232 18.0307 17.6428 17.1431 17.6428ZM12.8574 17.6428C11.9698 17.6428 11.2502 16.9232 11.2502 16.0356C11.2502 15.148 11.9698 14.4285 12.8574 14.4285C13.745 14.4285 14.4645 15.148 14.4645 16.0356C14.4645 16.9232 13.745 17.6428 12.8574 17.6428ZM8.57164 17.6428C7.68404 17.6428 6.9645 16.9232 6.9645 16.0356C6.9645 15.148 7.68404 14.4285 8.57164 14.4285C9.45924 14.4285 10.1788 15.148 10.1788 16.0356C10.1788 16.9232 9.45924 17.6428 8.57164 17.6428ZM9.64307 19.7856H20.3574C20.9491 19.7856 21.4288 20.2653 21.4288 20.8571C21.4288 21.4488 20.9491 21.9285 20.3574 21.9285H9.64307C9.05133 21.9285 8.57164 21.4488 8.57164 20.8571C8.57164 20.2653 9.05133 19.7856 9.64307 19.7856Z" fill="#2D2F30"/>
					</svg>
				</div>
			</div>

		</>
	);
};
