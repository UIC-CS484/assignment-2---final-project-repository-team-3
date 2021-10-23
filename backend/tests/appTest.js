const app = require("../app");
const supertest = require("supertest");

describe("Test Register", () => {
    test("It should fail with weak password or no input", async () => {
        const response = await supertest(app).post("/users/register");
        expect(response.statusCode).toBe(400);
    })
})
