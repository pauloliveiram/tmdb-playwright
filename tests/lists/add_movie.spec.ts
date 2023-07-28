import { test, expect } from '@playwright/test';

let listId: any;

test.beforeAll(async ({ request }) => {
  const response = await request.post('/3/list', {
    data: {
      name: "Lista temporária para testar adição de filme",
      description: "",
      language: "pt-br"
    }
  });

  const responseBody = await response.json();
  listId = responseBody.list_id;
});

test.afterEach(async ({ request }) => {
  await request.delete(`/3/list/${listId}/remove_item`, { data: { media_id: 26 } });
});

test.afterAll(async ({ request }) => {
  await request.delete(`/3/list/${listId}`);
});

test('Validar adição de filme em uma lista com sucesso', async ({ request }) => {
  const response = await request.post(`/3/list/${listId}/add_item`, { data: { media_id: 26 } });
  const responseBody = await response.json();

  expect(response.status()).toBe(201);
  expect(responseBody.status_code).toBe(12);
  expect(responseBody.status_message).toBe("The item/record was updated successfully.");
  expect(responseBody.success).toBeTruthy();
});

test('Validar erro ao tentar adicionar um filme mais de uma vez na lista', async ({ request }) => {
  await request.post(`/3/list/${listId}/add_item`, { data: { media_id: 26 } });
  const response = await request.post(`/3/list/${listId}/add_item`, { data: { media_id: 26 } });
  const responseBody = await response.json();

  expect(response.status()).toBe(403);
  expect(responseBody.status_code).toBe(8);
  expect(responseBody.status_message).toBe("Duplicate entry: The data you tried to submit already exists.");
  expect(responseBody.success).toBeFalsy();
});

test('Validar erro ao tentar adicionar filme inválido na lista', async ({ request }) => {
  const response = await request.post(`/3/list/${listId}/add_item`, { data: { media_id: "inv" } });
  const responseBody = await response.json();

  expect(response.status()).toBe(404);
  expect(responseBody.status_code).toBe(34);
  expect(responseBody.status_message).toBe("The resource you requested could not be found.");
  expect(responseBody.success).toBeFalsy();
});