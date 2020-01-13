require("dotenv").config();

const app = require("express")();
const cors = require("cors");
const fs = require("fs");

app.use(
  cors({
    origin: `http://localhost:${process.env.PORT}`,
    credentials: true
  })
);

// randomly select a five-letter word from json file
const fileContent = fs.readFileSync(
  "./five-letter-words.json",
  "utf-8"
);
const words = JSON.parse(fileContent);
const { fiveLetterWords } = words;
const randomIndex = Math.floor(
  Math.random() * fiveLetterWords.length
);
const fiveLetterWord = fiveLetterWords[randomIndex];

app.get("/", (req, res) => {
  res.send(fiveLetterWord);
});

app.listen(3030, () =>
  console.log(`random-word-server listening on port 3030`)
);

module.exports = app;
