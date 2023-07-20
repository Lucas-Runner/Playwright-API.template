// @ts-check
const {test, expect} = require('@playwright/test');

test.describe.parallel("API Testing", () => {
    const baseUrl = "https://reqres.in/api"

    test("Simple API Test - Assert Response Status", async ({request}) => {

        const response = await request.get(`${baseUrl}/users?page=2`);
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
        //console.log(responseBody);

    });

    test("Simple API Test - Assert Invalid Endpoint", async ({request}) => {

        const response = await request.get(`${baseUrl}/users?page=invalid endpont`);
        expect(response.status()).toBe(200);

    });

    test("GET request - Get User Detail", async ({request}) => {

        const response = await request.get(`${baseUrl}/users/1`);
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(1);
        expect(responseBody.data.first_name).toBe("George");
        expect(responseBody.data.last_name).toBe("Bluth");
        //console.log(responseBody);

    });

    test("POST request - Create New User", async ({request}) => {

      const response = await request.post(`${baseUrl}/users`, {
        data:{
          id: 1000,
        }
      });

      const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(201);
        //console.log(response.status());
        expect(responseBody.id).toBe(1000);
        expect(responseBody.createdAt).toBeTruthy();

    });

    test("POST request - Login", async ({request}) => {
      const response = await request.post(`${baseUrl}/login`, {
        data:{
          email: "eve.holt@reqres.in",
          password: "cityslicka",
        }
      });

      const responseBody = JSON.parse(await response.text());
      expect (response.status()).toBe(200);
      expect (responseBody.token).toBeTruthy();
      //console.log(response);
      //console.log(responseBody);
      
    });

    test("POST request -Login Failure", async ({request}) => {
      const response = await request.post(`${baseUrl}/login`, {
        data:{
          email: "peter@klaven",
        }
      });

      const responseBody = JSON.parse(await response.text());
      expect (response.status()).toBe(400);
      expect (responseBody.error).toBe("Missing password");

    });

    test.only("PUT Request - Update User", async ({request}) => {
      const response = await request.put(`${baseUrl}/users/2`, {
        data:{
          name: "New Name",
          job: "New Job",
        }
      });

      const responseBody = JSON.parse(await response.text());
      expect (response.status()).toBe(200);
      expect (responseBody.name).toBe("New Name");
      expect (responseBody.job).toBe("New Job");
      expect (responseBody.updatedAt).toBeTruthy();

    });
});
