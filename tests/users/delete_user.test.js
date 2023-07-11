const request = require("supertest")
const { faker } = require("@faker-js/faker")

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

  it("should delete user successfully", async () => {
    const responseFromDelete = await request(GOREST_BASE_URL)
      .delete(`/public/v2/users/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
    expect(responseFromDelete.status).toEqual(204)

    const responseFromGet = await request(GOREST_BASE_URL)
      .get(`/public/v2/users/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
    expect(responseFromGet.status).toEqual(404)
  })

  it("should not be able to delete user without bearer token", async () => {
    const response = await request(GOREST_BASE_URL).delete(
      `/public/v2/users/${userId}`
    )
    expect(response.status).toEqual(404)
    // 404 because you can't get user without authenticating first
    // should be 401?
  })

  it("should not be able to delete user with invalid url path", async () => {
    const response = await request(GOREST_BASE_URL)
      .delete(`/public/v2/usrs/${userId}`)
      .set("Authorization", `Bearer ${BEARER_TOKEN}`)
    expect(response.status).toEqual(404)
  })
})
