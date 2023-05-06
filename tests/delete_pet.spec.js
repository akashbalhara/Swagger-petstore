//@ts-check
import {test, expect} from "@playwright/test"

test("Create and delete a pet", async({request, baseURL}) => {
    const response = await request.post(`${baseURL}pet`, {
        data : {
            "id": Date.now(),
            "category": {
              "id": 8077,
              "name": "playwright cat"
            },
            "name": "playwright duffy",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 7017,
                "name": "white"
              }
            ],
            "status": "available"
          }
    })

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // assert that the data is correct
    expect(((await response.json()).category).name).toBe("playwright cat");
    expect(((await response.json()).tags[0]).name).toBe("white");

    // saving the pet id of the newly created pet
    const petId = (await response.json()).id

    // deleting the pet using petid
    const deletePet = await request.delete(`${baseURL}pet/`+petId, {
        headers :{
            api_key : "special-key",
        }
    })

    // assert that the api is working as expected
    expect(deletePet.ok()).toBeTruthy();
    expect(deletePet.status()).toBe(200);

    // assert that the pet is deleted by finding the pet
    const getPet = await request.get(`${baseURL}pet/`+petId);

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(getPet.status()).toBe(404);
    expect((await getPet.json()).message).toBe("Pet not found");


});