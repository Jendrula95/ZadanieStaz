const fs = require("fs");
const { verifyInput } = require("./exampleFromConst");

async function readFileAsync(filePath) {
	try {
		const data = await fs.promises.readFile(filePath, "utf8");
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (err) {
		throw err;
	}
}

async function main() {
	const filePath = "./JsonFile.json";
	try {
		const json = await readFileAsync(filePath);
		const result = verifyInput(json);
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

main();

module.exports = {
	verifyInput: verifyInput,
	readFileAsync: readFileAsync,
};
