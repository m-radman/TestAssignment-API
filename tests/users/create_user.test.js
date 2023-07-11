const request = require("supertest")
const constants = require("../auth/constants")
const { faker } = require("@faker-js/faker")

let accessToken
let goRestUrl
let createdId

describe("create user tests", () => {
  beforeAll(() => {
    accessToken = constants.BEARER_TOKEN
    goRestUrl = constants.GOREST_BASE_URL
  })

  it("should create new user successfully", async () => {
    const response = await request(goRestUrl)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
        status: "active",
      })
    console.log(response.body)
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty("id")
    createdId = response.body.id
  })

  it("should deny to create new user if email is already in use", async () => {
    const response = await request(goRestUrl)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Ezequiell Bluff",
        gender: "male",
        email: "ez.bluff@af.com",
        status: "active",
      })
    expect(response.status).toEqual(422)
  })

  it("should be unable to create new user without bearer token", async () => {
    const response = await request(goRestUrl)
      .post("/public/v2/users")
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
        status: "active",
      })
    expect(response.status).toEqual(401)
  })

  afterAll(async () => {
    await request(goRestUrl)
      .delete(`/public/v2/users/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
  })
})
