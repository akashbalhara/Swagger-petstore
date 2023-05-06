//@ts-check
import {test, expect} from "@playwright/test"

test("Create and update pet", async({request, baseURL}) => {
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

    // updating the created pet
    const updatePet = await request.put(`${baseURL}pet`, {
        data : {
            "id": petId,
            "category": {
              "id": 8077,
              "name": "playwright dog"
            },
            "name": "playwright duffy",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 7017,
                "name": "black"
              }
            ],
            "status": "available"
          }
        })

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // assert that the correct changes were made
    expect(((await updatePet.json()).category).name).toBe("playwright dog");
    expect(((await updatePet.json()).tags[0]).name).toBe("black");

});