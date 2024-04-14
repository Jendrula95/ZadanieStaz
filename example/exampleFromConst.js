function verifyInput(json) {
	return typeof json === "object" &&
		json !== null &&
		typeof json.PolicyDocument === "object" &&
		Array.isArray(json.PolicyDocument.Statement) &&
		!json.PolicyDocument.Statement.some(
			(statement) => statement.Resource === "*"
		)
		? true
		: false;
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
