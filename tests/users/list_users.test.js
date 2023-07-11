const request = require("supertest")
const constants = require("../auth/constants")

let accessToken
let goRestUrl

describe("list users tests", () => {
  beforeAll(() => {
    accessToken = constants.BEARER_TOKEN
    goRestUrl = constants.GOREST_BASE_URL
  })

  it("should return list of users", async () => {
    const response = await request("https://gorest.co.in")
      .get("/public/v2/users")
      .set("Authorization", `Bearer ${accessToken}`)
    // console.log(response.body)
    expect(response.status).toEqual(200)
  })

  it("should get created user", async () => {
    const response = await request(goRestUrl)
      .get("/public/v2/users/3588156")
      .set("Authorization", `Bearer ${accessToken}`)
    console.log(response.body)
    expect(response.body).toHaveProperty("name", "Ezequiell Bluff")
  })

  it("should not find deleted user", async () => {
    const response = await request(goRestUrl)
      .get("/public/v2/users/3588022")
      .set("Authorization", `Bearer ${accessToken}`)
    expect(response.status).toEqual(404)
  })
})
