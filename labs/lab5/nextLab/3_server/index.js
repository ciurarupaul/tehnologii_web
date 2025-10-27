import express, { request } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

const array = [
  { id: 1, name: "Ionut", age: 25 },
  { id: 2, name: "Alex", age: 18 },
  { id: 3, name: "Mihai", age: 13 },
  { id: 4, name: "Marcel", age: 12 },
  { id: 5, name: "Marius", age: 22 },
];

router.route("/getList").get((req, res) => {
  res.json(array);
});

router.post("/postList", (req, res) => {
  let el = req.body;
  el.id = array.length + 1;
  array.push(el);
  res.json(el);
});

// implementați un nou endpoint în server care să primească id-ul unei resurse și să răspundă cu resursa respectivă.
router.route("/getList/:id").get((req, res) => {
  const requestId = req.params.id;
  const item = array.find((el) => el.id === parseInt(requestId));

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "Id invalid" });
  }
});

let port = 8000;
app.listen(port);

console.log("server is running");
