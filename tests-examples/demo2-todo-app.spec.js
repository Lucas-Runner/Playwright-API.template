const { test, expect } = require('@playwright/test');

let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://petstore.swagger.io/',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
})

test.afterAll(async ({ }) => {
  await apiContext.dispose();
});

test('[POST][200]:/v2/pet', async () => {
  const payload = {
    "id": 0,
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "Spot",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "available"
  }

  const response = await apiContext.post(`/v2/pet`, {
    data: payload
  });

  const pet = await response.json()

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200)
  expect(pet.name).toBe("Spot")
  expect(pet.status).toBe("available")
  expect(pet).toHaveProperty("name")
  expect(pet).toHaveProperty("status")
  expect(typeof pet.name).toBe("string")
  expect(typeof pet.status).toBe("string")
});

test('[GET][200]:/v2/pet/findByStatus:available', async () => {
  
  const response = await apiContext.get(`/v2/pet/findByStatus?status=available`);

  const responseBody = await response.json()

  expect(response.ok()).toBeTruthy();
  
  expect(response.status()).toBe(200)
  
  expect(responseBody[0].status).toBe("available")
  
  expect(responseBody[0]).toHaveProperty("name")
  
  expect(responseBody[0]).toHaveProperty("status")
  
  expect(typeof responseBody[0].name).toBe("string")
  
  expect(typeof responseBody[0].status).toBe("string")
});

test('[GET][400]:/v2/pet/findByStatus:invalid', async () => {
  const response = await apiContext.get(`/v2/pet/findByStatus?status=invalid`);

  expect(response.status()).toBe(400)
  expect(response.ok()).toBeFalsy();
});

test('[PUT][200]:/v2/pet', async () => {
  const response = await apiContext.get(`/v2/pet/findByStatus?status=available`);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200)

  const pets = await response.json()
  const petId = pets[0].id

  const putPayload = {
    "id": petId,
    "category": {
      "id": 0,
      "name": "string"
    },
    "name": "Spotties",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "string"
      }
    ],
    "status": "sold"
  }

  const newResponse = await apiContext.put(`/v2/pet`, {
    data: putPayload
  })
  const newPet = await newResponse.json();

  expect(newResponse.ok()).toBeTruthy()
  expect(newResponse.status()).toBe(200)
  expect(newPet.status).toBe("sold")
});