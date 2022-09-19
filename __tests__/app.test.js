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
          expect(msg).toBe('Invalid input syntax');
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

  describe('PATCH /api/reviews/:review_id', () => {
    // functionality
    test('it accepts object with key inc_votes and value of number (can be both positive and negative) and returns object with key of updated containing updated object', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({
          inc_votes: 1,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty('updated');
          expect(Array.isArray(body)).toBe(false);
          expect(Array.isArray(body.updated)).toBe(false);
          expect(typeof body).toBe('object');
          expect(typeof body.updated).toBe('object');
        });
    });
    test('object with positive value increases', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({
          inc_votes: 10,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.updated.votes).toBe(11);
        });
    });
    test('object with negative value decreases', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({
          inc_votes: -1,
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.updated.votes).toBe(0);
        });
    });
    test('it returns object of updated review', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({
          inc_votes: 10,
        })
        .expect(200)
        .then(({ body }) => {
          const obj_1 = {
            review_id: 1,
            title: 'Agricola',
            designer: 'Uwe Rosenberg',
            owner: 'mallionaire',
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: 'Farmyard fun!',
            category: 'euro game',
            created_at: '2021-01-18T10:00:20.514Z',
            votes: 11,
          };
          expect(body.updated).toEqual(obj_1);
        });
    });

    // error handling
    test('400: missing required fields for patch input', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid input, missing key or value');
        });
    });
    test('400: incorrect value type for patch input ', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({
          inc_votes: 'cow',
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid input syntax');
        });
    });
    test('400: incorrect value type for patch input ', () => {
      return request(app)
        .patch('/api/reviews/1')
        .send({
          inc_votes: 5.39,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toEqual('Invalid input syntax');
        });
    });
    test('400: Id is too large', () => {
      return request(app)
        .patch('/api/reviews/1010101010101')
        .send({
          inc_votes: 10,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Review_id:1010101010101 is too large');
        });
    });
    test('404: Id does not exist', () => {
      return request(app)
        .patch('/api/reviews/999999')
        .send({
          inc_votes: 10,
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Review_id:999999 does not exist');
        });
    });
  });

  describe('GET /api/reviews', () => {
    // functionality
    test('responds with object with property reviews which holds an array', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveProperty('reviews');
          expect(typeof body).toBe('object');
          expect(Array.isArray(body)).toBe(false);
          expect(Array.isArray(body.reviews)).toBe(true);
        });
    });
    test('each object in array should have specified properties', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body: { reviews } }) => {
          reviews.forEach((review) => {
            expect(typeof review).toBe('object');
            expect(Array.isArray(review)).toBe(false);
            expect(review).toHaveProperty('owner', expect.any(String));
            expect(review).toHaveProperty('title', expect.any(String));
            expect(review).toHaveProperty('review_id', expect.any(Number));
            expect(review).toHaveProperty('category', expect.any(String));
            expect(review).toHaveProperty('review_img_url', expect.any(String));
            expect(review).toHaveProperty('created_at', expect.any(String));
            expect(review).toHaveProperty('votes', expect.any(Number));
            expect(review).toHaveProperty('designer', expect.any(String));
            expect(review).toHaveProperty('comment_count', expect.any(Number));
          });
        });
    });
    test('array is sorted by date in descending order', () => {
      return request(app)
        .get('/api/reviews')
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews).toBeSortedBy('created_at', { descending: true });
        });
    });
    // query
    test('endpoint can accept category query which returns only those with following category', () => {
      return request(app)
        .get('/api/reviews?category=euro%20game')
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews).toEqual([
            {
              title: 'Agricola',
              designer: 'Uwe Rosenberg',
              owner: 'mallionaire',
              review_img_url:
                'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
              review_body: 'Farmyard fun!',
              category: 'euro game',
              created_at: '2021-01-18T10:00:20.514Z',
              comment_count: 0,
              votes: 1,
              review_id: 1,
            },
          ]);
        });
    });
    test('endpoint can accept category query which returns array of correct length', () => {
      return request(app)
        .get('/api/reviews?category=social%20deduction')
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews.length).toEqual(11);
        });
    });
    test('array is still sorted by date in descending order', () => {
      return request(app)
        .get('/api/reviews?category=social%20deduction')
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews).toBeSortedBy('created_at', { descending: true });
        });
    });
    test('each object in array still should have specified properties', () => {
      return request(app)
        .get('/api/reviews?category=social%20deduction')
        .expect(200)
        .then(({ body: { reviews } }) => {
          reviews.forEach((review) => {
            expect(typeof review).toBe('object');
            expect(Array.isArray(review)).toBe(false);
            expect(review).toHaveProperty('owner', expect.any(String));
            expect(review).toHaveProperty('title', expect.any(String));
            expect(review).toHaveProperty('review_id', expect.any(Number));
            expect(review).toHaveProperty('category', expect.any(String));
            expect(review).toHaveProperty('review_img_url', expect.any(String));
            expect(review).toHaveProperty('created_at', expect.any(String));
            expect(review).toHaveProperty('votes', expect.any(Number));
            expect(review).toHaveProperty('designer', expect.any(String));
            expect(review).toHaveProperty('comment_count', expect.any(Number));
          });
        });
    });
    test('if query category exist but not comments with category, returns empty array', () => {
      return request(app)
        .get('/api/reviews?category=children%27s%20games')
        .expect(200)
        .then(({ body: { reviews } }) => {
          expect(reviews).toBeSortedBy([]);
        });
    });
    // errors
    test('404: not a route', () => {
      return request(app)
        .get('/api/reviewssss')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Endpoint not found');
        });
    });
    test('404: query category does not exist (assumign we allow numbers etc)', () => {
      return request(app)
        .get('/api/reviews?category=45')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Query category does not exist');
        });
    });
    test('400: query not supported', () => {
      return request(app)
        .get('/api/reviews?animals=rhino')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Query not supported');
        });
    });
    test('404: category doesnt exist', () => {
      return request(app)
        .get('/api/reviews?category=monkeys')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Query category does not exist');
        });
    });
  });

  describe('DELETE /api/comments/:comment_id', () => {
    // functionality
    test('that nothing is returned and correct code 204', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then((res) => {
          expect(res.noContent).toBe(true);
        });
    });
    test('that id 1 does not exist in database, and that 5 other items remain', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then(() => {
          const check1 = db
            .query('SELECT * FROM comments WHERE comment_id = 1;')
            .then((result) => {
              expect(result.rows.length).toBe(0);
            });
          const check2 = db.query('SELECT * FROM comments;').then((result) => {
            expect(result.rows.length).toBe(5);
          });

          return Promise.all([check1, check2]);
        });
    });

    //errors
    test('400: Id is too large', () => {
      return request(app)
        .delete('/api/comments/1010101010101')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Comment_id:1010101010101 is too large');
        });
    });
    test('404: Id does not exist', () => {
      return request(app)
        .delete('/api/comments/999999')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Comment_id does not exist');
        });
    });
    test('400: Invalid id', () => {
      return request(app)
        .delete('/api/comments/raw')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Invalid input syntax');
        });
    });
  });
});
