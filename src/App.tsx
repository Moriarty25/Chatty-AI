import { Dispatch, SetStateAction, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Main } from './pages/Main/Main'
import { FormSection } from './components/FormSection/FormSection'
import { AnswerSection, TStoredValues } from './components/AnswerSection/AnswerSection'
import { Configuration, OpenAIApi } from 'openai'
import { TestScss } from './components/TestScss/TestScss'
import AudioTranscription from './components/AudioTranscription/AudioTranscription.tsx';

function App() {

	const [count, setCount] = useState(0)
	const [storedValues, setStoredValues] = useState<Array<TStoredValues>>([]);

	const configuration = new Configuration({
		apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
	});

	const openai = new OpenAIApi(configuration);

	const generateResponse = async (
		newQuestion: string, 
		setNewQuestion: Dispatch<SetStateAction<string>>,
	) => {
		const options = {
			model: 'text-davinci-003',
			temperature: 0,
			max_tokens: 500,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stop: ['/'],
		};

		const completeOptions = {
			...options,
			prompt: newQuestion,
		};
		const response = await openai.createCompletion(completeOptions);

		if (response.data.choices) {
			setStoredValues([
				{
					question: newQuestion,
					answer: response.data.choices[0].text,
				},
				...storedValues,
			]);
			setNewQuestion('');
		}

	};


	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			{/* <h1>Vite + React</h1>
			<AudioTranscription/>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
          count is {count}
				</button>
				<p>
          Edit <code>src/App.tsx</code> and save to test HMR
				</p>
				<TestScss text="Demo variables scss!" />
			</div>
			<p className="read-the-docs">
        Click on the Vite and React logos to learn more
			</p> */}
			<Main />
			<FormSection generateResponse={generateResponse}/>
			<AnswerSection storedValues={storedValues}/>
		</>
	)
}

export default App
