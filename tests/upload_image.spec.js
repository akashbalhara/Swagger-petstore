//@ts-check
import {test, expect} from "@playwright/test"
import path from "path";
import fs from "fs";

test("Create a pet and Upload image for the pet", async({request, baseURL}) => {
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
    console.log(petId)

    // setting file path and buffer
    const file = path.resolve("tests/fixtures/", "playwright_dog_pic.jpg");
    const image = fs.readFileSync(file);
    const metaData = "Dog Image";
    console.log(petId)

    // uploading image 
    const uploadImg = await request.post(`${baseURL}pet/`+petId+'/uploadImage' , {
        multipart: {
          file : {
            name : file,
            mimeType : "image/jpeg",
            buffer : image,
          },
          additionalMetadata : metaData
        }
    })

    // assert that the api is working as expected
    //expect(uploadImg.status()).toBe(200);

    console.log(uploadImg.text());
    // assert that the correct metadata is getting returned
    //expect((await uploadImg.json()).message).toContain(metaData);
});