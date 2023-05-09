//@ts-check
import {test, expect} from "@playwright/test"

test("Create and delete an order", async({request, baseURL}) => {
    const newOrder = await request.post(`${baseURL}store/order` ,{
        data : {
            "id": Date.now(),
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
    const orderId = (await newOrder.json()).id

    // deleting order using orderid
    const deletOrder = await request.delete(`${baseURL}store/order/`+orderId);
    
    // assert that the api is working as expected
    expect(deletOrder.ok()).toBeTruthy();
    expect(deletOrder.status()).toBe(200);
    expect(Number((await deletOrder.json()).message)).toBe(orderId);
    

});