
import {useCallback, useEffect, useState} from 'react';

async function requestRecorder() {
	const stream = await navigator.mediaDevices.getUserMedia({audio: true})
	return new MediaRecorder(stream)
}

export default function useVoiceRecording() {
	const [voice, setVoice] = useState<Blob | null >(null)  
	const [isRecording, setIsRecording] = useState(false)
	const [recorder, setRecorder] = useState<MediaRecorder | null>(null)

	useEffect(() => {
		requestRecorder().then((mediaRecorder) => {
			setRecorder(mediaRecorder)

			mediaRecorder.addEventListener('dataavailable', (e: BlobEvent) => {
				setVoice(e.data)
			});
		});
	}, [])
	
	const startRecording = useCallback(() => {
		if (!recorder) return
		
		setIsRecording(true);
		recorder.start();

	}, [recorder, setIsRecording])

	const stopRecording = useCallback(() => {
		if (!recorder) return

		recorder.stop();
		setIsRecording(false);
	
	}, [recorder, setIsRecording])

	return {voice, isRecording, startRecording, stopRecording};
}
