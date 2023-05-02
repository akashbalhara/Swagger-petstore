// @ts-check
import{ test, expect } from '@playwright/test';

test("Create a new user and then delete it", async ({ request, baseURL}) => {

    const userName = "akash_playwright_delete";
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

  // log-in in with a username and passwaord query params
  const responseLogin = await request.get(`${baseURL}user/login`, {
    params : {
        "username": "akash_playwright",
        "password": "playwright@123",
    }
  });

  // assert that the api is working as expected
  expect(responseLogin.ok()).toBeTruthy();
  expect(responseLogin.status()).toBe(200);

  // deleting the user
  const responseDelete = await request.delete(`${baseURL}user/`+userName);

  // assert that the api is working as expected
  expect(responseDelete.ok()).toBeTruthy();
  expect(responseDelete.status()).toBe(200);
  
  // assert that correct data is getting returned 
  const responseData = await responseDelete.json();
  expect (responseData.message).toContain(userName);



});