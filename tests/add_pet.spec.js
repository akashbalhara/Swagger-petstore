// @ts-check
import {test, expect} from "@playwright/test"

test ("Create a new pet", async({request, baseURL}) => {

    const response = await request.post(`${baseURL}pet`, {
        data: {
            "id": 6199,
            "category": {
              "id": 2107,
              "name": "playwright dog"
            },
            "name": "playwright Tommy",
            "photoUrls": [
              "string"
            ],
            "tags": [
              {
                "id": 1708,
                "name": "black"
              }
            ],
            "status": "available"

        }
    });

    // assert that the api is working as expected
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // saving created pet info
    const petDetail = await response.json();

});