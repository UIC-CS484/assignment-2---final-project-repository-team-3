const app = require("../app");
const request = require("supertest");
const supertest = require("supertest");

describe("Test Register", () => {
    test("It should fail with weak password or no input", async () => {
        const response = await request(app).post("/users/register");
        expect(response.statusCode).toBe(400);
    })
})
