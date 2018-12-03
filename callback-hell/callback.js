let express = require("express");
const request = require('request');

let app = express();

app.listen(4000, () => console.log("app started"));

app.get("/", (req, res) => {
	initCallbackHell((cb_res) => {
		res.send("Callback hell DEMO: " + cb_res);
	});
})

function initCallbackHell(callback) {
	let finalMsg = '';
	request.get("http://demo3010395.mockable.io/getMessage", (err, resp, body) => {
		body = JSON.parse(body);
		finalMsg += `RES1: << ${body.msg} >>`;
		request.get("http://demo3010395.mockable.io/getMessageNew", (err1, resp1, body1) => {
			body1 = JSON.parse(body1);
			finalMsg += `RES2: << ${body1.msg} >>`;
			request.post("http://demo3010395.mockable.io/setValue", (err2, resp2, body2) => {
				body2 = JSON.parse(body2);
				finalMsg += `RES3: << ${body2.content} >>`;
				callback(finalMsg);
			});
		});
	});
}
