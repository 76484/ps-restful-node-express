require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Test', () => {
  after((done) => {
    mongoose.connection.close();
    app.server.close(done);
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  it('should allow a book to be posted and return isRead and _id', (done) => {
    const bookPost = {
      author: 'Jon',
      genre: 'Fiction',
      title: 'My Book',
    };

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((_err, results) => {
        results.body.isRead.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });
});
