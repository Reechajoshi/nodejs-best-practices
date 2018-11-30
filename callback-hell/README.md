# Virtualize async call to synchronouse call

Steps: 
1) Declare a method which returns promise and resolved promise returns final value: eg:
	```
	function returnPromise() {
		return somePromiseMethod().then((response) => response);
	}
	```
2) call this method in async function using await: eg:
	```
	** async ** function callPromise() {
		const promiseResponse = ** await ** returnPromise();
		consoel.log(promiseResponse);
	}
	```


Steps to run App:
	- sudo docker-compose up --build