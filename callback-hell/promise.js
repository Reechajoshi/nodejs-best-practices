let express = require("express");
const request = require('request');

let app = express();

app.listen(4000, () => console.log("app started"));

app.get("/", (req, res) => {
	initCallbackHell().then(promiseRes => {
		res.send("Callback Hell Res: " + promiseRes);
	});
})

function initCallbackHell() {
	let finalMsg = "";
	return getPromise("http://demo3010395.mockable.io/getMessage").then((promise1Res) => {
		finalMsg += promise1Res;
		getPromise("http://demo3010395.mockable.io/getMessageNew").then((promise2Res) => {
			finalMsg += promise2Res;
			getPromise("http://demo3010395.mockable.io/setValue", true).then((promise3Res) => {
				finalMsg += promise3Res;
			});
		});
	});
}

function getPromise(url, isPost) {
	return new Promise((resolve, reject) => {
		if (isPost) {
			request.post(url, (err, resp, body) => {
				resolve(body);
			});	
		} else {
			request.get(url, (err, resp, body) => {
				resolve(body);
			});
		}
	});
}
