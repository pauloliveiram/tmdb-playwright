import { test, expect } from '@playwright/test';

let listId: any;

test.beforeAll(async ({ request }) => {
  const response = await request.post('/3/list', {
    data: {
      name: "Lista temporária para testar remoção de lista",
      description: "",
      language: "pt-br"
    }
  });

  const responseBody = await response.json();
  listId = responseBody.list_id;
});

test('Validar remoção de lista com sucesso', async ({ request }) => {
  const response = await request.delete(`/3/list/${listId}`);
  const responseBody = await response.json();
  expect(response.status()).toBe(500);
  expect(responseBody.status_code).toBe(11);
  expect(responseBody.status_message).toBe("Internal error: Something went wrong, contact TMDb.");
  expect(responseBody.success).toBeFalsy();
})