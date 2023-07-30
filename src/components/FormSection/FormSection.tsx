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
	
	// function toggleRecording() {
	// 	isRecording ? stopRecording() : startRecording();
	// }

	return (
		<>
			<div className={styles.control}>
				<Input
					placeholder="Сообщение"
					value={newQuestion}
					onChange={(e) => setNewQuestion(e.target.value)}
				/>
				<img
					className={styles.send}
					src="/src/assets/send.svg"
					alt="send"
					onClick={onOpenaiHandler}
				/>
			</div>
			<div className={styles.voice}>
				<div className={styles.inner}>
					<VoiceInput
						onClick={handleClickStartListening}
						active={isRecording}
					/>
					<img
						className={styles.keyboard}
						src="/src/assets/keyboard.svg"
						alt="keyboard"
					/>
				</div>
			</div>

		</>
	);
};
