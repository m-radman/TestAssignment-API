const request = require("supertest")

const { BEARER_TOKEN, GOREST_BASE_URL } = require("../../config/development")
const { cleanUp, createNewUser } = require("../../lib/users/setup_teardown")

let userId

describe("update user tests", () => {
  beforeEach(async () => {
    userId = await createNewUser()
  })

  afterEach(async () => {
    await cleanUp(userId)
  })

  it("should update user successfully", async () => {
    const responseFromUpdate = await request(GOREST_BASE_URL)
      .patch(`/public/v2/users/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: "John Constantine",
        email: "hellblazer@example.dc",
        gender: "male",
        status: "inactive",
      })
    expect(responseFromUpdate.status).toEqual(200)

    const responseFromGet = await request(GOREST_BASE_URL)
      .get(`/public/v2/users/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
    expect(responseFromGet.body).toHaveProperty(
      "email",
      "hellblazer@example.dc"
    )
  })

  it("should be unable to update user without bearer token", async () => {
    const response = await request(GOREST_BASE_URL)
      .patch(`/public/v2/users/${userId}`)
      .send({
        name: "BoJack Horseman",
        email: "horsinaround@example.com",
        gender: "male",
        status: "inactive",
      })
    expect(response.status).toEqual(404)
    // 404 because you can't found created user witout authenticating first
    // should be 401?
  })

  it("should deny update because of blank field", async () => {
    const response = await request(GOREST_BASE_URL)
      .patch(`/public/v2/users/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: "Jessica Jones",
        email: "alias@example.com",
        gender: "female",
        status: "",
      })
    expect(response.status).toEqual(422) // 422 Unprocessible Entity
  })

  it("should deny update with empty body", async () => {
    const response = await request(GOREST_BASE_URL)
      .patch(`/public/v2/users/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({})
    expect(response.status).toEqual(200)
    // 200 OK no changes are made
    // could be 204 Not modified?
  })

  it("should be unable to update user with wrong url path", async () => {
    const response = await request(GOREST_BASE_URL)
      .patch(`/public/v2/usr/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
      .send({
        name: "Johnny B Good",
        email: "johnny@example.com",
        gender: "male",
        status: "inactive",
      })
    expect(response.status).toEqual(404) // 404 Not found
  })
})
