/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	let xhr = new XMLHttpRequest();
	xhr.withCredentials = true;
	xhr.responseType = 'json';
	/*options.callback = (err, response) => {
		if (err == '') {
			//console.log(response);
		} else {
			//console.log(err);
		}
	}*/
	if (options.method == 'GET') {
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
	} else {
		let formData = new FormData();
		for (let prop in options.data){
			formData.append(`${prop}, ${options.data[prop]}`);
		}
		try {
			xhr.open(options.method, options.url);
			xhr.send(formData);
		} catch(e) {
			options.callback(e);
		}
	}
	xhr.onreadystatechange = function() {
		if (this.readyState === xhr.DONE && this.status === 200) {
			console.log(xhr.response);
			let err = null;
			let response = xhr.response;
			options.callback = (err,response) => {;
			if (responce) {
				callback = (err,response) => {return response};
				return xhr;
				console.log(xhr.response);
			} else {
				options.callback = (err,response) => {return err};
				return xhr;
				console.log(xhr.response);
			}
		
		return xhr;
	}
}
}
	//console.log(xhr);
	return xhr;

};

