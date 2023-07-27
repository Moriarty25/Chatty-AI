// @ts-ignore
import React, {useEffect, useState} from 'react';
import styles from './AudioTranscription.module.scss'
import useVoiceRecording from '../../hooks/useVoiceRecording.ts';
import viteLogo from '/vite.svg';
// import {useReactMediaRecorder} from 'react-media-recorder'
import axios from 'axios';

export default function AudioTranscription() {
	const {voice, isRecording, startRecording, stopRecording} = useVoiceRecording()

	useEffect(() => {
		console.log(voice, ' VOICE from Effect')
	}, [voice])
	
	function transcriptVoiceInText() {
		const formData = new FormData()
		if (voice !== null) {
			formData.append('file', voice)
			formData.append('lang', 'ru')
	
			axios.post('https://api.speechflow.io/asr/file/v1/create', formData, {
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
						.then(res => console.log(res, 'response'))
	
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
					type: 'audio/wav',
				}))} controls />
				<button onClick={transcriptVoiceInText}>transcriptVoiceInText</button>
			</>
		</>
	)
}