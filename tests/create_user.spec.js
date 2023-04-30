// @ts-check
import{ test, expect } from '@playwright/test';

test("Create a new user", async ({ request, baseURL}) => {

  // creating a post request with random user data
  const response = await request.post(`${baseURL}user`, {
    data : {
      "id": 0,
      "username": "akash_playwright",
      "firstName": "playwright",
      "lastName": "testing",
      "email": "playwright_testing@mailinator.com",
      "password": "playwright@123",
      "phone": "8080808080",
      "userStatus": 0
    },
  });

  // getting the response and fetching user id
  const result = await response.json();
  const userID = result.message;

  // assert that the api is working as expected
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); 

});