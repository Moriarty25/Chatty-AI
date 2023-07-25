// @ts-ignore
import React, {useState} from 'react';
import styles from './AudioTranscription.module.scss'
import {useReactMediaRecorder} from 'react-media-recorder'
import apiSpeechFlow from '../../api/api.ts'

export default function AudioTranscription() {
	const { startRecording, stopRecording, mediaBlobUrl } =
		useReactMediaRecorder({ audio: true });

	const [isRecording, setIsRecording] = useState(false)

	const data = {
		lang: 'ru',
		file: mediaBlobUrl,
	}

	const handleStartRecording = () => {
		setIsRecording(true)
		startRecording()
	}

	const handleStopRecording = (e) => {
		e.preventDefault()
		setIsRecording(false)
		stopRecording()
		const lang: string = 'ru'
		const remotePath: string | null = mediaBlobUrl

		fetch('https://api.speechflow.io/asr/file/v1/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'keyId': 'bKsW0JDm6q2ACQv7',
				'keySecret': 'cmzthZGIBWHN2B4m',
			},
			body: {
				'lang': lang,
				'remotePath': remotePath,
			},
		})
			.then((response => response.json()))
			.then(data => console.log(data))
	}

	return (
		<>
			<form>
				<textarea className={styles.text} readOnly name="result"></textarea>
				<button type="button" className={!isRecording ? `${styles.startRecord}` : `${styles.startRecordNoVisible}`} onClick={handleStartRecording}>Start</button>
				<button type="submit" className={!isRecording ? `${styles.stopRecord}` : `${styles.stopRecordVisible}`} onClick={handleStopRecording}>Stop</button>
				<audio className={styles.audio} src={mediaBlobUrl} controls />
			</form>
		</>
	)
}