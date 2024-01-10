const PORT = 8888;
require("express-async-errors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(require("cors")());
app.use(require("cors")());

app.use("/users", require("./routes/users"));

app.use(require("./middlewares/errorHandler"));
app.use(require("./middlewares/catchAllException"));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is running on ${PORT}`);
});
