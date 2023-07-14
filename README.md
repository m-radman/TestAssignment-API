# Automation assignment API testing task

The main objective of this task is to write automation tests for the following https://gorest.co.in/ endpoints:

- Create a new user
- Update user details
- Delete user

My solution for this task takes two ways.  
The first one is delivered using SuperTest, a module for HTTP testing, and the Jest testing framework.  
And the second is done using the Postman API platform and Newman, a command-line Postman collection runner.

---

### Where to find code

To see how tests are implemented go [here](https://github.com/m-radman/TestAssignment-API/tree/master/tests/users).

---

### How to run tests

For running tests you need to take next steps:

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`
3. Run tests using these commands:
   - To run all tests use `npm run test`
   - To run _CREATE_ tests use `npm run create.test`
   - To run _UPDATE_ tests use `npm run update.test`
   - To run _DELETE_ tests use `npm run delete.test`
   - To run Postman collection use `npm run postman.test`
