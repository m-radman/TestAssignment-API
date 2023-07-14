# Automation assignment API testing task

The main objective of this task is to write automation tests for the following https://gorest.co.in/ endpoints:

- Create a new user
- Update user details
- Delete user

I solved this task in two ways: 
   1. using SuperTest, a JavaScript library for HTTP testing, and Jest as JavaScript testing framework.  
   2. using Postman and Newman - command-line Postman collection runner

---

## Where to find code

To see how tests are implemented go [here](https://github.com/m-radman/TestAssignment-API/tree/master/tests/users).

---

## How to run tests

For running tests you need to take next steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`
3. Run tests using these commands:
   - To run all tests `npm run test`
   - To run _CREATE_ tests `npm run create:test`
   - To run _UPDATE_ tests `npm run update:test`
   - To run _DELETE_ tests `npm run delete:test`
   - To run Postman collection using Newman `npm run postman:test`
