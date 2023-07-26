// @ts-ignore
import React, {useEffect, useState} from 'react';
import styles from './AudioTranscription.module.scss'
import useVoiceRecording from '../../hooks/useVoiceRecording.ts';
import viteLogo from '/vite.svg';
// import {useReactMediaRecorder} from 'react-media-recorder'
import axios from 'axios';

export default function AudioTranscription() {
	// const { startRecording, stopRecording, mediaBlobUrl } =
	// 	useReactMediaRecorder({ audio: true });
	//
	// const [isRecording, setIsRecording] = useState(false)
	// const [record, setRecord] = useState('')
	//
	// const handleStartRecording = () => {
	// 	setIsRecording(true)
	// 	startRecording()
	// }
	// const handleStopRecording = (e) => {
	// 	e.preventDefault()
	// 	setIsRecording(false)
	// 	stopRecording()
	// 	const lang: string = 'ru'
	// 	const voice = new Blob([mediaBlobUrl], {
	// 		type: 'audo/wav',
	// 	})
	// 	const form = new FormData()
	// 	form.append('file', voice)
	// 	console.log(voice)
	//
	// 		axios.post(`https://api.speechflow.io/asr/file/v1/create?lang=${lang}`, form, {
	// 		headers: {
	// 			'Content-Type': 'multipart/form-data',
	// 			'keyId': 'bKsW0JDm6q2ACQv7',
	// 			'keySecret': 'cmzthZGIBWHN2B4m',
	// 		},
	// 	})
	// 		.then((dataFromPostReq)=> {
	// 			const taskId = dataFromPostReq.data.taskId
	// 			// eslint-disable-next-line max-len
	// 			axios.get(`https://api.speechflow.io/asr/file/v1/query?taskId=${taskId}`, {
	// 				headers: {
	// 					'keyId': 'bKsW0JDm6q2ACQv7',
	// 					'keySecret': 'cmzthZGIBWHN2B4m',
	// 				},
	// 			})
	// 				.then(res => console.log(res))
	//
	// 		})
	// 		.catch(err => console.log(`Ошибка: ${err}`))
	// }
	const {voice, isRecording, startRecording, stopRecording} = useVoiceRecording()
	const [voiceUrl, setVoiceUrl] = useState('')
	
	useEffect(() => {
		console.log(voice, ' VOICE from Effect')
	}, [voice])
	
	const formData = new FormData()
	function transcriptVoiceInText() {
		if (voice !== null) {
			formData.append('file', new Blob([voice], {
				type: 'audio/mp3',
			}), 'file.mp3')
			formData.append('lang', 'en')
			console.log(formData);
			
			const dataForSpeechFlow = URL.createObjectURL(new Blob([voice], {
				type: 'audio/wav',
			}))
			console.log(formData.get('file'), 'formData');
			
			const lang = 'ru'
			axios.post(`https://api.speechflow.io/asr/file/v1/create`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'keyId': 'bKsW0JDm6q2ACQv7',
					'keySecret': 'cmzthZGIBWHN2B4m',
				},
			})
				.then((dataFromPostReq)=> {
					const taskId = dataFromPostReq.data.taskId
					// eslint-disable-next-line max-len
					axios.get(`https://api.speechflow.io/asr/file/v1/query?taskId=${taskId}`, {
						headers: {
							'keyId': 'bKsW0JDm6q2ACQv7',
							'keySecret': 'cmzthZGIBWHN2B4m',
						},
					})
						.then(res => console.log(res))
	
				})
				.catch(err => console.log(`Ошибка: ${err}`))
		}
	}
	
	return (
		<>
			<>
				<textarea className={styles.text} readOnly name="result" value='res' />
				{/* eslint-disable-next-line max-len */}
				<button type="button" className={!isRecording ? `${styles.startRecord}` : `${styles.startRecordNoVisible}`} onClick={startRecording}>Start</button>
				{/* eslint-disable-next-line max-len */}
				<button type="submit" className={!isRecording ? `${styles.stopRecord}` : `${styles.stopRecordVisible}`} onClick={stopRecording}>Stop</button>
				<audio className={styles.audio} src={URL.createObjectURL(new Blob([voice], {
				type: 'audo/wav',
			}))} controls />
				<button onClick={transcriptVoiceInText}>transcriptVoiceInText</button>
			</>
		</>
	)
}