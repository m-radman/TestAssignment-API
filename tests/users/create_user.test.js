const request = require("supertest")
const { faker } = require("@faker-js/faker")

const { BEARER_TOKEN, GOREST_BASE_URL } = require("../../config/development")
const { cleanUp } = require("../../lib/users/setup_teardown")

let newUserId

describe("create user tests", () => {
  afterAll(async () => {
    await cleanUp(newUserId)
  })

  it("should create new user successfully", async () => {
    const response = await request(GOREST_BASE_URL)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
        status: "active",
      })
    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty("id")
    newUserId = response.body.id

    await request(GOREST_BASE_URL)
      .get(`/public/v2/users/${newUserId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
    expect(response.status).toEqual(201)
  })

  it("should deny to create new user if email is already in use", async () => {
    const response = await request(GOREST_BASE_URL)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: "Ezequiell Bluff",
        gender: "male",
        email: "ez.bluff@af.com",
        status: "active",
      })
    expect(response.status).toEqual(422) // 422 unprocessible
  })

  it("should be unable to create new user without bearer token", async () => {
    const response = await request(GOREST_BASE_URL)
      .post("/public/v2/users")
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
        status: "active",
      })
    expect(response.status).toEqual(401) // 401 no auth
  })

  it("should be unable to create new user with field left missing", async () => {
    const response = await request(GOREST_BASE_URL)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
      })
    expect(response.status).toEqual(422)
  })

  it("should be unable to create new user with empty body", async () => {
    const response = await request(GOREST_BASE_URL)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({})
    expect(response.status).toEqual(422)
  })

  it("should be unable to create new user with wrong url path", async () => {
    const response = await request(GOREST_BASE_URL)
      .post("/public/v2/usrs")
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
        status: "active",
      })
    expect(response.status).toEqual(404)
  })
})
