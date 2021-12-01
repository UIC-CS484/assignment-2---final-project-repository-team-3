const app = require("../app");
const supertest = require("supertest");

describe("Test Register", () => {
    test("It should fail with weak password or no input", async () => {
        const response = await supertest(app).post("/users/register");
        expect(response.statusCode).toBe(400);
    })
    test("Proper registration details provided", async () => {
        const data = {
            firstName: "test",
            lastName: "test2",
            email: "test@test.com",
            password: "Test123!"
        }
        const response = await supertest(app).post("/users/register").send(data);
        expect(response.statusCode).toBe(200);
    })
})

