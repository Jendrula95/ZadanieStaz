const { verifyInput } = require("../example/exampleFromConst");

describe("verifyInput function", () => {
	test("should return false for non-object input", () => {
		const jsonData = "this is not an object";
		expect(verifyInput(jsonData)).toBe(false);
	});

	test("should return false if PolicyDocument is missing", () => {
		const jsonData = {
			PolicyName: "root",
		};
		expect(verifyInput(jsonData)).toBe(false);
	});

	test("should return false if Statement contains Resource '*'", () => {
		const jsonData = {
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
		expect(verifyInput(jsonData)).toBe(false);
	});

	test("should return true for valid JSON object", () => {
		const jsonData = {
			PolicyName: "root",
			PolicyDocument: {
				Version: "2012-10-17",
				Statement: [
					{
						Sid: "IamListAccess",
						Effect: "Allow",
						Action: ["iam:ListRoles", "iam:ListUsers"],
						Resource: "arn:aws:iam::123456789012:user/*",
					},
				],
			},
		};
		expect(verifyInput(jsonData)).toBe(true);
	});

	test("should return false if PolicyDocument is not an object", () => {
		const jsonData = {
			PolicyName: "root",
			PolicyDocument: "not an object",
		};
		expect(verifyInput(jsonData)).toBe(false);
	});

	test("should return false if PolicyDocument.Statement is not an array", () => {
		const jsonData = {
			PolicyName: "root",
			PolicyDocument: {
				Version: "2012-10-17",
				Statement: "not an array",
			},
		};
		expect(verifyInput(jsonData)).toBe(false);
	});
});
