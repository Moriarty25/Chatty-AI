import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
	log: true,
});

export const convertWebMToWAV = async (webmFile: File): Promise<Blob | null> => {
	try {
		// Load the ffmpeg.wasm library
		await ffmpeg.load();

		// Read the WebM file
		ffmpeg.FS('writeFile', 'input.webm', await fetchFile(webmFile));

		// Convert WebM to WAV
		await ffmpeg.run('-i', 'input.webm', 'output.wav');

		// Read the converted WAV file
		const wavData = ffmpeg.FS('readFile', 'output.wav');

		return new Blob([wavData.buffer], { type: 'audio/wav' });
	} catch (error) {
		console.error('Error converting to WAV:', error);
		return null;
	}
};
