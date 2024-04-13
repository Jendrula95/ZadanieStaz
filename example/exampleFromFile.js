const fs = require("fs");

function verifyInput(json) {
	if (typeof json !== "object" || json === null) return false;

	if (json.PolicyDocument && json.PolicyDocument.Statement) {
		for (let statement of json.PolicyDocument.Statement) {
			if (statement.Resource === "*") {
				return false;
			}
		}
	}
	return true;
}

function readFileAsync(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			try {
				const jsonData = JSON.parse(data);
				resolve(jsonData);
			} catch (err) {
				reject(err);
			}
		});
	});
}

const filePath = "./JsonFile.json";
readFileAsync(filePath).then((json) => {
	const result = verifyInput(json);

	console.log(result);
});

module.exports = {
	verifyInput: verifyInput,
	readFileAsync: readFileAsync,
};
