import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.json({
    users: ["userone", "usertwo", "usethree", "userfour"],
  });
});

const port = 8098;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
