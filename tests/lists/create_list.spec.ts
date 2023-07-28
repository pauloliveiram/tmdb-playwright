import { test, expect } from '@playwright/test';

let listId: any;

test.afterAll(async ({ request }) => {
  await request.delete(`/3/list/${listId}`);
})

test('Validar criação de lista de filmes com sucesso', async ({ request }) => {
  const response = await request.post('/3/list', {
    data: {
      name: "Teste da automação",
      description: "",
      language: "pt-br"
    }
  });
  
  const responseBody = await response.json();
  listId = responseBody.list_id;
  
  expect(response.status()).toBe(201);
  expect(responseBody.status_code).toBe(1);
  expect(responseBody.status_message).toBe("The item/record was created successfully.");
  expect(responseBody.success).toBeTruthy();
  expect(typeof responseBody.list_id).toBe("number");
})