const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const frequentWord = require("./frequentword");

app.use(bodyParser.json());
app.use(cors());

const PORT = 5050;
app.get("/getfrequentword", frequentWord);
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
