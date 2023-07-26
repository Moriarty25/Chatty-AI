// @ts-ignore
import React, {useState} from 'react';
import styles from './AudioTranscription.module.scss'
import useVoiceRecording from '../../hooks/useVoiceRecording.ts';
import viteLogo from '/vite.svg';
// import {useReactMediaRecorder} from 'react-media-recorder'
// import axios from 'axios';

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

	function handleSubmit(e) {
		e.preventDefault()
		console.log(voice)
		setVoiceUrl(URL.createObjectURL(voice))
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<textarea className={styles.text} readOnly name="result" value='res' />
				{/* eslint-disable-next-line max-len */}
				<button type="button" className={!isRecording ? `${styles.startRecord}` : `${styles.startRecordNoVisible}`} onClick={startRecording}>Start</button>
				{/* eslint-disable-next-line max-len */}
				<button type="submit" className={!isRecording ? `${styles.stopRecord}` : `${styles.stopRecordVisible}`} onClick={stopRecording}>Stop</button>
				<audio className={styles.audio} src={voiceUrl} controls />
			</form>
		</>
	)
}