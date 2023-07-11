const request = require("supertest")
const { faker } = require("@faker-js/faker")
const { BEARER_TOKEN, GOREST_BASE_URL } = require("../../config/development")

async function cleanUp(userId) {
  await request(GOREST_BASE_URL)
    .delete(`/public/v2/users/${userId}`)
    .set("Authorization", `Bearer ${BEARER_TOKEN}`)
}

async function createNewUser() {
  const response = await request(GOREST_BASE_URL)
    .post("/public/v2/users")
    .set("Authorization", `Bearer ${BEARER_TOKEN}`)
    .send({
      name: `${faker.person.fullName()}`,
      gender: `${faker.person.sex()}`,
      email: `${faker.internet.exampleEmail()}`,
      status: "active",
    })
  return response.body.id
}

module.exports = {
  cleanUp: cleanUp,
  createNewUser: createNewUser,
}
