import { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './FormSection.module.scss';
import { Input } from '../Input/Input';

type TFormSectionProps = {
  generateResponse: (
    newQuestion: string,
    setNewQuestion: Dispatch<SetStateAction<string>>
  ) => void;
};

export const FormSection: FC<TFormSectionProps> = ({ generateResponse }) => {
	const [newQuestion, setNewQuestion] = useState('');

	function onOpenaiHandler() {
		if (!newQuestion) return
		generateResponse(newQuestion, setNewQuestion)
	}

	return (
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
	);
};
