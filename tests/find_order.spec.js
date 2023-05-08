//@ts-check
import { test, expect } from "@playwright/test";

test("Create a order and find it using order id", async ({request, baseURL}) => {
    const newOrder = await request.post(`${baseURL}store/order` ,{
        data : {
            "id": 10,
            "petId": 6199,
            "quantity": 10,
            "shipDate": "2023-05-07T12:48:50.940Z",
            "status": "placed",
            "complete": true
          }
        });

    // assert that the api is working as expected
    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    expect((await newOrder.json()).id).toBe(10);

    // finding the order using orderid
    const findOrder = await request.get(`${baseURL}store/order/`+10)

    // assert that the api is working as expected
    expect(newOrder.ok()).toBeTruthy();
    expect(newOrder.status()).toBe(200);
    expect((await findOrder.json()).petId).toBe(6199);
});