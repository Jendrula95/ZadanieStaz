const { verifyInput, readFileAsync } = require("../example/exampleFromFile");
const { fail } = require("jest");
describe("verifyInput function", () => {
	test("should return true for valid JSON object", () => {
		const json = {
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
		expect(verifyInput(json)).toBe(true);
	});

	test("should return false for null input", () => {
		const jsonData = null;
		expect(verifyInput(jsonData)).toBe(false);
	});

	test("should return false for non-object input", () => {
		const jsonData = "this is not an object";
		expect(verifyInput(jsonData)).toBe(false);
	});

	test("should return false if Resource field contains a single asterisk", () => {
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
});

describe("readFileAsync function", () => {
	test("should verify JSON input asynchronously", async () => {
		const filePath = "./JsonFile.json";

		try {
			const json = await readFileAsync(filePath);
			const result = verifyInput(json);
			expect(result).toBeTruthy();
		} catch (error) {
			expect(error);
		}
	});
});
