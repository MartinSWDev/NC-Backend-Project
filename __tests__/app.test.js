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
        .then(({ body: { categories } }) => {
          categories.forEach((obj) => {
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
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Endpoint not found');
        });
    });
  });

  describe('GET /api/reviews/:review_id', () => {
    // functionality
    test('that specific properties are correct on returned review (including if comment count 0)', () => {
      return request(app)
        .get('/api/reviews/1')
        .expect(200)
        .then(({ body: { review } }) => {
          expect(Array.isArray(review)).toBe(false);
          expect(typeof review).toBe('object');
          expect(review).toHaveProperty('review_id', 1);
          expect(review).toHaveProperty('title', 'Agricola');
          expect(review).toHaveProperty('review_body', 'Farmyard fun!');
          expect(review).toHaveProperty('designer', 'Uwe Rosenberg');
          expect(review).toHaveProperty(
            'review_img_url',
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
          );
          expect(review).toHaveProperty('votes', 1);
          expect(review).toHaveProperty('category', 'euro game');
          expect(review).toHaveProperty('owner', 'mallionaire');
          expect(review).toHaveProperty(
            'created_at',
            '2021-01-18T10:00:20.514Z'
          );
          expect(review).toHaveProperty('comment_count', 0);
        });
    });
    test('returns any review object with correct properties (including if comment count 0)', () => {
      return request(app)
        .get('/api/reviews/4') // Can change this number to test other reviews
        .expect(200)
        .then(({ body: { review } }) => {
          expect(Array.isArray(review)).toBe(false);
          expect(typeof review).toBe('object');
          expect(review).toHaveProperty('review_id', expect.any(Number));
          expect(review).toHaveProperty('title', expect.any(String));
          expect(review).toHaveProperty('review_body', expect.any(String));
          expect(review).toHaveProperty('designer', expect.any(String));
          expect(review).toHaveProperty('review_img_url', expect.any(String));
          expect(review).toHaveProperty('votes', expect.any(Number));
          expect(review).toHaveProperty('category', expect.any(String));
          expect(review).toHaveProperty('owner', expect.any(String));
          expect(review).toHaveProperty('created_at', expect.any(String));
          expect(review).toHaveProperty('comment_count', 0);
        });
    });

    // comment_count

    test('that comment count is also returned with correct value when comments present', () => {
      return request(app)
        .get('/api/reviews/2')
        .expect(200)
        .then(({ body: { review } }) => {
          expect(Array.isArray(review)).toBe(false);
          expect(typeof review).toBe('object');
          expect(review).toHaveProperty('review_id', 2);
          expect(review).toHaveProperty('title', 'Jenga');
          expect(review).toHaveProperty(
            'review_body',
            'Fiddly fun for all the family'
          );
          expect(review).toHaveProperty('designer', 'Leslie Scott');
          expect(review).toHaveProperty(
            'review_img_url',
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png'
          );
          expect(review).toHaveProperty('votes', 5);
          expect(review).toHaveProperty('category', 'dexterity');
          expect(review).toHaveProperty('owner', 'philippaclaire9');
          expect(review).toHaveProperty(
            'created_at',
            '2021-01-18T10:01:41.251Z'
          );
          expect(review).toHaveProperty('comment_count', 3);
        });
    });

    // error handling
    test('400: Id is too large', () => {
      return request(app)
        .get('/api/reviews/1010101010101')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Review_id:1010101010101 is too large');
        });
    });
    test('404: Id does not exist', () => {
      return request(app)
        .get('/api/reviews/999999')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Review_id:999999 does not exist');
        });
    });
    test('400: Invalid id', () => {
      return request(app)
        .get('/api/reviews/raw')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Invalid Id');
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
