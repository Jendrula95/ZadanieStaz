function verifyInput(json) {
	if (typeof json !== "object" || json === null) return false;

	if (typeof json.PolicyDocument !== "object") return false;

	if (!Array.isArray(json.PolicyDocument.Statement)) return false;

	for (let statement of json.PolicyDocument.Statement) {
		if (statement.Resource === "*") {
			return false;
		}
	}
	return true;
}

const exampleJSON = {
	PolicyName: "root",
	PolicyDocument: {
		Version: "2012-10-17",
		Statement: [
			{
				Sid: "IamListAccess",
				Effect: "Allow",
				Action: ["iam:ListRoles", "iam:ListUsers"],
				Resource: "*",
			},
		],
	},
};
module.exports = {
	verifyInput: verifyInput,
};

const result = verifyInput(exampleJSON);

console.log(result);
