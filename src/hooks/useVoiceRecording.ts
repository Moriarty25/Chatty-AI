
import {useEffect, useState} from 'react';

async function requestRecorder() {
	const stream = await navigator.mediaDevices.getUserMedia({audio: true})
	return new MediaRecorder(stream)
}

export default function useVoiceRecording() {
	const [voice, setVoice] = useState([])  // стейт переменная, куда сохраняем запись
	const [isRecording, setIsRecording] = useState(false)
	const [recorder, setRecorder] = useState(null)

	useEffect(() => {
		if (recorder === null) {
			if (isRecording) {
				requestRecorder().then(setRecorder);
			}
			return;
		}
		console.log(recorder)

		if (isRecording) {
			recorder.start();
		} else {
			recorder.stop();
		}

		recorder.addEventListener('dataavailable', (e) => {
			setVoice(e.data)
		})

		return () => recorder.removeEventListener('dataavailable', (e) => {
			setVoice(e.data)
		})

	}, [recorder, isRecording])

	function startRecording(){
		setIsRecording(true);
	}

	function stopRecording(){
		setIsRecording(false);
	}

	return {voice, isRecording, startRecording, stopRecording};
}