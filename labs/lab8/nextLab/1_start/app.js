import express from "express";
import Book from "./book.js";

const app = express();
const port = 3000;

let books = [
  new Book(1, "Dune", "sf", "Frank Herbert"),
  new Book(2, "Robinson Crusoe", "adventure", "Daniel Dafoe"),
  new Book(3, "Foundation", "sf", "Asimov"),
];

// express config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up router
const bookRouter = express.Router();
app.use("/api", bookRouter);

app.listen(port, () => {
  console.log("Running on port " + port + "..");
});

app.get("/", (req, res) => {
  res.send("Welcome to my API.");
});

bookRouter
  .route("/books")
  .get((req, res) => {
    let filteredBooks = [];

    if (req.query.genre) {
      filteredBooks = books.filter((item) => item.genre == req.query.genre);
    } else {
      filteredBooks = books;
    }

    res.status(200).json(filteredBooks);
  })
  // post requests
  // implementează apoi un request POST care să valideze informațiile trimise în corpul cererii înainte de a salva
  .post((req, res) => {
    const sanitizeString = (item) =>
      typeof item === "string" ? item.trim() : "";
    const sanitizeNumber = (item) => (typeof item === "number" ? item : "-1");

    const { id, name, genre, author } = req.body;

    let newBook = new Book(
      sanitizeNumber(id),
      sanitizeString(name),
      sanitizeString(genre),
      sanitizeString(author)
    );

    books.push(newBook);
    console.log(books);

    return res.status(201).json(newBook);
  })
  // Implementează ulterior o metoda de tip DELETE pentru lista de cărți și testează folosind Postman
  .delete((req, res) => {
    books = [];
    return res.status(200).json(books);
  });

bookRouter.route("/books/:bookId").put((req, res) => {
  let bookModif = books.find((item) => item.id == req.params.bookId);

  bookModif.name = req.body.name;
  bookModif.genre = req.body.genre;
  bookModif.author = req.body.author;

  return res.status(200).json(bookModif);
});

//  implementează un nou request de tip GET pentru a returna lista tuturor cărților în ordine alfabetică
app.get("/books/alphabetical", (req, res) => {
  const sortedBooks = [
    ...books.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      else return 0;
    }),
  ];

  res.status(200).json(sortedBooks);
});

// D:\Paul\Anul III\tehnologii_web\labs\lab8\nextLab\1_start
