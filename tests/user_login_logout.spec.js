// @ts-check
import{ test, expect } from '@playwright/test';

test("log-in and log-out user", async ({ request, baseURL}) => {

  // log-in in with a username and passwaord query params
  const response = await request.get(`${baseURL}user/login`, {
    params : {
        "username": "akash_playwright",
        "password": "playwright@123",
    }
  });

  // assert that the api is working as expected
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200); 

  // getting the response and asserting proper message is getting displayed
  const result = await response.json();
  expect (result.message).toContain('logged in user session:');

  // log-out 
  const responseLogOut = await request.get(`${baseURL}user/logout`);
  
  // assert that the api is working as expected
  expect(responseLogOut.ok()).toBeTruthy();
  expect(responseLogOut.status()).toBe(200);

  // getting the response and asserting proper message is getting displayed
  const resultLogOut = await responseLogOut.json();
  expect (resultLogOut.message).toContain('ok');
});