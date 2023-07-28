import { test, expect } from '@playwright/test';

test('Validar o endpoint GET /account/{account_id}/lists', async ({ request }) => {
  const response = await request.get("/3/account/{account_id}/lists");
  const responseBody = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(typeof responseBody.page).toBe('number');
  expect(Array.isArray(responseBody.results)).toBe(true);
  expect(typeof responseBody.results[0].description).toBe('string');
  expect(typeof responseBody.results[0].favorite_count).toBe('number');
  expect(typeof responseBody.results[0].id).toBe('number');
  expect(typeof responseBody.results[0].item_count).toBe('number');
  expect(typeof responseBody.results[0].iso_639_1).toBe('string');
  expect(typeof responseBody.results[0].list_type).toBe('string');
  expect(typeof responseBody.results[0].name).toBe('string');
  expect(typeof responseBody.results[0].poster_path).toBeNull;
  expect(typeof responseBody.total_pages).toBe('number');
  expect(typeof responseBody.total_results).toBe('number');
});