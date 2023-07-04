// @ts-check
const { test, expect } = require('@playwright/test');

test.describe.parallel("API Testing", () => {
  const baseUrl = "https://reqres.in/api"
  
  test("Simple API Test - Assert Response Status", async ({ request }) => {

    const response = await request.get(`${baseUrl}/users?page=2`);
    expect (response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    console.log(responseBody);

  });

  test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {

    const response = await request.get(`${baseUrl}/users?page=invalid endpont`);
    expect (response.status()).toBe(200);

  });

  test.only("GET request - Get User Detail", async ({ request }) => {

    const response = await request.get(`${baseUrl}/users/1`);
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data.id).toBe(1);
    expect(responseBody.data.first_name).toContainText("George");
    console.log(responseBody);

  });
  
});