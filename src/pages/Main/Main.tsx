import React, { useState } from 'react';

export const Main: React.FC = () => {
	const [listening, setListening] = useState(false);
	const [recognizedText, setRecognizedText] = useState('');

	const startListening = () => {
		const recognition = new (window as any).webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;

		recognition.onstart = () => {
			setListening(true);
		};

		recognition.onresult = (event: { results: string | any[]; }) => {
			const transcript = event.results[event.results.length - 1][0].transcript;
			setRecognizedText(transcript);
		};

		recognition.onerror = (event: { error: any; }) => {
			console.error('Recognition error: ', event.error);
		};

		recognition.onend = () => {
			setListening(false);
		};

		recognition.start();
	};

	const stopListening = () => {
		const recognition = new (window as any).webkitSpeechRecognition();
		recognition.stop();
		setListening(false);
	};

	return (
		<div>
			<h1>Voice Recognition</h1>
			<button onClick={listening ? stopListening : startListening}>
				{listening ? 'Stop Listening' : 'Start Listening'}
			</button>
			<p>Recognized Text: {recognizedText}</p>
		</div>
	);
};
