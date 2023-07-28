import { test, expect } from '@playwright/test';

let listId: any;

test.beforeAll(async ({ request }) => {
  const response = await request.post('/3/list', {
    data: {
      name: "Lista temporária para testar limpar lista",
      description: "",
      language: "pt-br"
    }
  });

  const responseBody = await response.json();
  listId = responseBody.list_id;

  await request.post(`/3/list/${listId}/add_item`, { data: { media_id: 26 } });
  await request.post(`/3/list/${listId}/add_item`, { data: { media_id: 27 } });
});

test.afterAll(async ({ request }) => {
  await request.delete(`/3/list/${listId}`);
});

test('Validar limpeza de lista com sucesso', async ({ request }) =>{
  const response = await request.post(`/3/list/${listId}/clear?confirm=true`)
  const responseBody = await response.json();

  expect(response.status()).toBe(201);
  expect(responseBody.status_code).toBe(12);
  expect(responseBody.status_message).toBe("The item/record was updated successfully.");
  expect(responseBody.success).toBeTruthy();
})