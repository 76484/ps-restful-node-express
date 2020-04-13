function booksController(Book) {
  function get(req, res) {
    const query = {};

    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      return res.json(books);
    });
  }

  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

    book.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.status(201);

      return res.json(book);
    });
  }

  return { get, post };
}

module.exports = booksController;
