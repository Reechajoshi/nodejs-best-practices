let express = require("express");
const request = require('request');

let app = express();
let finalMsg = "";

app.listen(4000, () => console.log("app started"));

app.get("/", (req, res) => {
	initCallbackHell().then(promiseRes => {
		res.send("Callback Hell Res: " + promiseRes);
	}).catch(err => {
		res.send(err.message);
	});
})

function initCallbackHell() {
	return new Promise((resolve, reject) => {
		resolve(getPromise("http://demo3010395.mockable.io/getMessage").then((promise1Res) => {
			finalMsg += promise1Res;
			return getPromise("http://demo3010395.mockable.io/getMessageNew");
		}).then((promise2Res) => {
			finalMsg += promise2Res;
			return getPromise("http://demo3010395.mockable.io/setValue", true);
		}).then((promise3Res) => {
			finalMsg += promise3Res;
			return (finalMsg);
		}).catch(err => {
			throw new Error(err);
		}));
	});
}

function getPromise(url, isPost) {
	return new Promise((resolve, reject) => {
		if (isPost) {
			request.post(url, (err, resp, body) => {
				if (err) reject(err);
				resolve(body);
			});	
		} else {
			request.get(url, (err, resp, body) => {
				if (err) reject(err);
				resolve(body);
			});
		}
	});
}
