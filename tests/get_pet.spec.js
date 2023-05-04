// @ts-check
import {test, expect} from "@playwright/test"

test("Create a pet and fetch its detail", async({request, baseURL}) => {
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
    });

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // saving the pet id of the newly created pet
    const petInfo = await response.json();
    const petId = petInfo.id

    // getting the details of the pet using petid
    const getPet = await request.get(`${baseURL}pet/`+petId);

    // assert that the api is working as expected
    expect(getPet.ok()).toBeTruthy();
    expect(getPet.status()).toBe(200);


    // stroing the pet details and assert that the petid is correct
    const pet_Info = await getPet.json();
    expect(pet_Info.id).toBe(petId);

});