class Api {
	private _url: string;
	private _headers: object;
	constructor(option: { url: string, headers : object }) {
		this._url = option.url
		this._headers = option.headers
	}

	// @ts-ignore
	_checkResponse(res) {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	createTranscription(data) {
		console.log(data)
		return fetch(`${this._url}/create`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				lang: data.lang,
				file: data.file,
			}),
		})
			.then(this._checkResponse)
	}

	// getTranscription(transcription: string) {
	// 	const responseJSON:{taskId: string} = JSON.parse(responseData);
	// 	const taskId: string = responseJSON.taskId
	// 	return fetch(`${this._url}/query?taskId=${taskId}`, {
	// 		method: 'GET',
	// 		headers: this._headers,
	// 		body: JSON.stringify({
	//
	// 		}),
	// 	})
	// }

}

const apiSpeechFlow = new Api({
	url: 'https://api.speechflow.io/asr/file/v1',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'keyId': 'bKsW0JDm6q2ACQv7',
		'keySecret': 'cmzthZGIBWHN2B4m',
	},
})

export default apiSpeechFlow