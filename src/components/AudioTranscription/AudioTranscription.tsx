// @ts-ignore
import React, {useState} from 'react';
import styles from './AudioTranscription.module.scss'
import {useReactMediaRecorder} from 'react-media-recorder'
import apiSpeechFlow from '../../api/api.ts'

export default function AudioTranscription() {
	const { startRecording, stopRecording, mediaBlobUrl } =
		useReactMediaRecorder({ audio: true });

	const [isRecording, setIsRecording] = useState(false)

	const handleStartRecording = () => {
		setIsRecording(true)
		startRecording()
	}

	const handleStopRecording = (e, data) => {
		e.preventDefault()
		setIsRecording(false)
		stopRecording()

		apiSpeechFlow.createTranscription(data)
			.then(() => {

				}
			})

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