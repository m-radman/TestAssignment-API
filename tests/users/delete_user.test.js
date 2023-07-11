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

  it("should delete user successfully", async () => {
    const response = await request(goRestUrl)
      .delete(`/public/v2/users/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(204)
  })

  it("should not be able to delete user without bearer token", async () => {
    const response = await request(goRestUrl).delete(
      `/public/v2/users/${createdId}`
    )
    expect(response.status).toEqual(404) // 404 because you can't found created users while unauthenticated
  })

  it("should not be able to delete user with invalid url path", async () => {
    const response = await request(goRestUrl)
      .delete(`/public/v2/usrs/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(404)
  })

  afterAll(async () => {
    await request(goRestUrl)
      .delete(`/public/v2/users/${createdId}`)
      .set("Authorization", `Bearer ${accessToken}`)
  })
})
