/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = options.responseType;
	let callback = options.callback = f => f;
	if (options.method == 'GET') {
		if (options.data){
			options.url += '?';
			for (let prop in options.data){
  				options.url += `${prop}=${options.data[prop]}&`;
			}
			options.url = options.url.slice(0, options.url.length - 1);
			try {
				xhr.open( options.method, options.url);
				xhr.send();
				} catch(e) {
					options.callback(e);
				}
		}
	} else {
		if (options.data) {
			let formData = new FormData();
			for (let prop in options.data){
				formData.append(prop, options.data[prop]);
			}
			try {
				xhr.open(options.method, options.url);
				xhr.send(formData);
			} catch(e) {
				options.callback(e);
			}
		}
	}
	xhr.addEventListener('readystatechange', () => {
		if (xhr.readyState === 4 && xhr.status === 200){
			if (!xhr.response.success) {
				console.log(xhr.response.error);
				callback(xhr.response.error,xhr.response);
			} else {
				console.log(xhr.response);
				let error = null;
				callback(error, xhr.response);
			}	
}
})
	return xhr;
};

