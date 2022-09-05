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
    test('returns an array', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then((result) => {
          expect(Array.isArray(result.body.rows)).toBe(true);
        });
    });
    test('returns an array of objects', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then((result) => {
          return result.body.rows.forEach((obj) => {
            expect(typeof obj).toBe('object');
            expect(Array.isArray(obj)).toBe(false);
          });
        });
    });
    test('that objects have properties slug and description', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then((result) => {
          return result.body.rows.forEach((obj) => {
            expect(obj).toHaveProperty('slug');
            expect(obj).toHaveProperty('description');
          });
        });
    });
    // error handling
    test('404: endpoint does not exist', () => {
      return request(app)
        .get('/api/categorie')
        .expect(404)
        .then((result) => {
          expect(result.body.err).toBe('Endpoint not found');
        });
    });
  });
});
