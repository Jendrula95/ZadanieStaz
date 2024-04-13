const { verifyInput, readFileAsync } = require("../example/exampleFromFile");

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
	test("should verify JSON input asynchronously", (done) => {
		const filePath = "./JsonFile.json";

		readFileAsync(filePath)
			.then((json) => {
				const result = verifyInput(json);
				expect(result).toBeTruthy(); // or whatever assertion is appropriate
				done(); // Wywołanie done() informuje Jest, że test został zakończony
			})
			.catch((error) => {
				done.fail(error); // Jeśli wystąpi błąd, przekazujemy go do done.fail()
			});
	});
});
