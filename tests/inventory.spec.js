// @ts-check
import {test, expect} from '@playwright/test'

test("Get inventory details", async({request, baseURL}) =>  {

    const response = await request.get(`${baseURL}store/inventory`);

    // getting and saving the inventory details
    const inventory = await response.json();

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

});