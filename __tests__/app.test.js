// testing variables
const request = require('supertest');

// test database variables
const db = require('../db/connection');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');

// file being tested
const app = require('../app');

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe('app.js tests', () => {
  describe('GET /api/categories', () => {
    // functionality
    test('returns an object with property categories which holds an array', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty('categories');
          expect(Array.isArray(body.categories)).toBe(true);
        });
    });
    test('each object in array has property slug (string) and description (string) ', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then((result) => {
          result.body.categories.forEach((obj) => {
            expect(typeof obj).toBe('object');
            expect(Array.isArray(obj)).toBe(false);
            expect(obj).toHaveProperty('slug', expect.any(String));
            expect(obj).toHaveProperty('description', expect.any(String));
          });
        });
    });
    // error handling
    test('404: endpoint does not exist', () => {
      return request(app)
        .get('/api/categorie')
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe('Endpoint not found');
        });
    });
  });

  describe('GET /api/users', () => {
    // functionality
    test('returns an object with property users which holds an array', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty('users');
          expect(Array.isArray(body.users)).toBe(true);
        });
    });
    test('each object in array has property username (string), name (string), and avatar_url (string)', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach((obj) => {
            expect(typeof obj).toBe('object');
            expect(Array.isArray(obj)).toBe(false);
            expect(obj).toHaveProperty('username', expect.any(String));
            expect(obj).toHaveProperty('name', expect.any(String));
            expect(obj).toHaveProperty('avatar_url', expect.any(String));
          });
        });
    });

    // error handling
    test('404: endpoint does not exist', () => {
      return request(app)
        .get('/api/usersbro')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Endpoint not found');
        });
    });
  });
});
