const request = require("supertest")
const constants = require("../auth/constants")
const { faker } = require("@faker-js/faker")

let accessToken
let goRestUrl
let createdId

describe("update user tests", () => {
  beforeAll(async () => {
    accessToken = constants.BEARER_TOKEN
    goRestUrl = constants.GOREST_BASE_URL

    const setNewUser = await request(goRestUrl)
      .post("/public/v2/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: `${faker.person.fullName()}`,
        gender: `${faker.person.sex()}`,
        email: `${faker.internet.exampleEmail()}`,
        status: "active",
      })

    createdId = setNewUser.body.id
  })

  it("should update user successfully", async () => {
    const response = await request(goRestUrl)
      .patch(`/public/v2/users/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "John Constantine",
        email: "hellblazer@example.dc",
        gender: "male",
        status: "inactive",
      })
    console.log(response.body)
    expect(response.status).toEqual(200)
  })

  it("should be unable to update user without bearer token", async () => {
    const response = await request(goRestUrl)
      .patch(`/public/v2/users/${createdId}`)
      .send({
        name: "BoJack Horseman",
        email: "horsinaround@example.com",
        gender: "male",
        status: "inactive",
      })
    expect(response.status).toEqual(404) // 404 because you can't found created user while unauthenticated
  })

  it("should deny update because of blank field", async () => {
    const response = await request(goRestUrl)
      .patch(`/public/v2/users/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Jessica Jones",
        email: "alias@example.com",
        gender: "female",
        status: " ",
      })
    expect(response.status).toEqual(422)
  })

  it("should be unable to update user with wrong url path", async () => {
    const response = await request(goRestUrl)
      .patch(`/public/v2/usr/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: "Johnny B Good",
        email: "johnny@example.com",
        gender: "male",
        status: "inactive",
      })
    expect(response.status).toEqual(404)
  })

  afterAll(async () => {
    await request(goRestUrl)
      .delete(`/public/v2/users/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
  })
})
