// @ts-check
const { test, expect } = require('@playwright/test');

test.describe.parallel("API Testing", () => {
  const baseUrl = "https://reqres.in/api"
  
  test("Simple API Test - Assert Response Status", async ({ request }) => {

    const response = await request.get(`${baseUrl}/users?page=2`);
    expect (response.status()).toBe(200);

  });
  
});