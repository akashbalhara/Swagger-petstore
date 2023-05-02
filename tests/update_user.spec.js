// @ts-check
import{ test, expect } from '@playwright/test';

test("Create a new user and then update the user details", async ({ request, baseURL}) => {

    // setting a random username
    const userName = "akash_playwright_update_test";

  // creating a post request with random user data
  const response = await request.post(`${baseURL}user`, {
    data : {
      "id": 0,
      "username": userName,
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
  
  // log-in in with a username and password query params
  const responseLogin = await request.get(`${baseURL}user/login`, {
    params : {
        "username": "akash_playwright",
        "password": "playwright@123",
    }
  });


  // updating the same user with new details
  const responseUpdate = await request.put(`${baseURL}user/`+userName, {
    data : {
        "id": 0,
        "username": userName,
        "firstName": "playwright-updated",
        "lastName": "testing",
        "email": "playwright_testing@mailinator.com",
        "password": "playwright@123",
        "phone": "8080808080",
        "userStatus": 0
      },

  });

  // getting the response and fetching user id
  const resultUpdate = await responseUpdate.json();
  const userIDUpdate = resultUpdate.message;

  // assert that the api is working as expected
  expect(responseUpdate.ok()).toBeTruthy();
  expect(responseUpdate.status()).toBe(200);



});