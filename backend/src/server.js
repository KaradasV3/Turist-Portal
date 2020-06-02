import app from "./app.js";
import connectDb from "./Connection/dbConnection.js";

const port = process.env.PORT;

connectDb()
  .then(() => {
    console.log("\x1b[42m\x1b[30m%s\x1b[0m", "Database connected");

    app.listen(port, () => {
      console.log("\x1b[44m\x1b[30m%s\x1b[0m", `Server started at http://localhost:${port}`);
    });
  })

  .catch(() => {
    console.log("\x1b[42m\x1b[30m%s\x1b[0m", "Database connection failed");
  });
