//@ts-check
import {test, expect} from "@playwright/test"

test("Create a new pet order", async({request, baseURL}) => {
    const newOrder = await request.post(`${baseURL}store/order` ,{
        data : {
            "id": Date.now(),
            "petId": 6199,
            "quantity": 10,
            "shipDate": "2023-05-07T12:48:50.940Z",
            "status": "placed",
            "complete": true
          }
    })

    // assert that the api is working as expected
    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    expect((await newOrder.json()).petId).toBe(6199);

});