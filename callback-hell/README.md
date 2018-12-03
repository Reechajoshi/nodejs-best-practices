# Callback hell explained

1) Callback hell example is present in callback.js file: 
	- request module is used to make async call to mock APIs
	- final callback is called to return data to get request

	```
	request.get(url, (err, resp, body) => {
		request.get(url, (err, resp, body) => {
			request.get(url, (err, resp, body) => {
				callback();
			});
		});
	});
	```
2) Wrong chaining while converting callback to promise (promise.js):
	- general mistake is to nest all promises within each other
	```
	promiseMethod1(param).then(promiseResponse => {
		promiseMethod2(param).then(promiseResponse => {
			promiseMethod3(param).then(promiseResponse => {
				resolve();
			})
		})
	});
	```
2) Chaining promise to avoid callback hell (server.js):
	- to use multiple promise, the program should return promise on each resolved promise, avoiding the nesting
	- this approach will avoid nesting and keep all promises on same level
	- ADV: only final catch block is needed instead of handling error at every promise individually
	- ADV: keeps the code clean
	```
	promiseMethod(param).then(promiseResponse => {
		return promiseMethod2();
	})
	.then(promiseMethod1Res => {
		return promiseMethod3();
	})
	.then(promiseMethod3Res => {
		resolve();
	});
	```

Steps to run App:
	- sudo docker-compose up --build