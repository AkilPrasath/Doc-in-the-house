var axios = require("axios");
require("dotenv").config();
function getPatient(name) {
	var data = JSON.stringify({
		collection: "patients",
		database: "datastore",
		dataSource: "doc-in-the-house",
		filter: {
			name: name,
		},
	});

	var config = {
		method: "post",
		url: "https://data.mongodb-api.com/app/data-qextw/endpoint/data/beta/action/findOne",
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Request-Headers": "*",
			"api-key": process.env.MONGO_DATA_API_KEY,
		},
		data: data,
	};

	return axios(config);
	// .then(function (response) {
	// 	console.log(JSON.stringify(response.data));
	// })
	// .catch(function (error) {
	// 	console.log(error);
	// });
}
exports.getPatient = getPatient;
