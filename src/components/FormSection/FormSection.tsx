import { Dispatch, FC, SetStateAction, useState } from 'react';
import  styles from'./FormSection.module.scss'

type TFormSectionProps = {
	generateResponse: (
		newQuestion: string, 
		setNewQuestion: Dispatch<SetStateAction<string>>
		) => void
}

export const FormSection: FC<TFormSectionProps> = ({ generateResponse }) => {
	const [newQuestion, setNewQuestion] = useState('');

	return (
		<div className={styles.form}>
			<textarea
				className={styles.control}
				placeholder="Ask me anything..."
				value={newQuestion}
				onChange={(e) => setNewQuestion(e.target.value)}
			/>
			<button 
				className="btn"
				onClick={() => generateResponse(newQuestion, setNewQuestion)}
			>
                Generate Response
			</button>
		</div>
	)
}
