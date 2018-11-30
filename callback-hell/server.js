let express = require("express");

let app = express();

app.listen(4000, () => console.log("app started"));

app.get("/", (req, res) => {
	res.send("Callback hell");
})