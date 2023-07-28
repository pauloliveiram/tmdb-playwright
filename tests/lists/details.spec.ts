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
});

test.afterAll(async ({ request }) => {
  await request.delete(`/3/list/${listId}`);
});

test('Validar a resposta do GET de lists/details', async ({ request }) => {
  const response = await request.get(`/3/list/${listId}`);
  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(typeof responseBody.created_by).toBe("string");
  expect(typeof responseBody.description).toBe("string");
  expect(typeof responseBody.favorite_count).toBe("number");
  expect(typeof responseBody.id).toBe("string");
  expect(Array.isArray(responseBody.items)).toBe(true);
  expect(typeof responseBody.items[0].adult).toBe("boolean");
  expect(typeof responseBody.items[0].backdrop_path).toBe("string");
  expect(Array.isArray(responseBody.items[0].genre_ids)).toBe(true);
  expect(typeof responseBody.items[0].id).toBe("number");
  expect(typeof responseBody.items[0].media_type).toBe("string");
  expect(typeof responseBody.items[0].original_language).toBe("string");
  expect(typeof responseBody.items[0].original_title).toBe("string");
  expect(typeof responseBody.items[0].overview).toBe("string");
  expect(typeof responseBody.items[0].popularity).toBe("number");
  expect(typeof responseBody.items[0].poster_path).toBe("string");
  expect(typeof responseBody.items[0].release_date).toBe("string");
  expect(typeof responseBody.items[0].title).toBe("string");
  expect(typeof responseBody.items[0].video).toBe("boolean");
  expect(typeof responseBody.items[0].vote_average).toBe("number");
  expect(typeof responseBody.items[0].vote_count).toBe("number");
  expect(typeof responseBody.item_count).toBe("number");
  expect(typeof responseBody.iso_639_1).toBe("string");
  expect(typeof responseBody.name).toBe("string");
  expect(responseBody.poster_path).toBeNull();
})