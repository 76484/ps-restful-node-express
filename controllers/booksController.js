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
    book.save();
    return res.status(201).json(book);
  }

  return { get, post };
}

module.exports = booksController;
