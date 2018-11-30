let express = require("express");
let app = express();
let db;

// connect to mongo client
var MongoClient = require('mongodb').MongoClient;

// start express server
app.listen(3000, () => console.log("app started at 3000"));

// expose endpoint
app.get("/", async (req, res) => {
	// form the request object
	var reqObj = formReqObj(req);
	
	// use await to call async method insertValue
	// async method virtualized to synchronous call
	const insertResponse = await insertValue(queryParam);

	// send response
	res.send((insertResponse && insertResponse.ops) ? (insertResponse.ops) : ({message: "insert_error"}));
});

// connect to mongodb
MongoClient.connect("mongodb://mongo/mydb", function (err, resDb) {
	if(err) throw err;
	db = resDb;
});

// form request object
function formReqObj(reqObj) {
	return {
		name: reqObj.query.name || "John Doe",
		address: reqObj.query.address || "Highway 34"
	}
}


// method returns 
// - promise
// - resolved promise returns final value which is assigned to method call
function insertValue(insertObj) {
	var dbo = db.db("mydb");

	return dbo.collection("customers").insertOne(insertObj).then((err, res) => {
		if (err) 
			return err;
		else 
			return res;
	});
}