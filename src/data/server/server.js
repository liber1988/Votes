const express = require("express");
const cors = require("cors"); // Import the cors package

const app = express();
const port = 3001;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Use the CORS middleware
app.use(cors());

// Sample data
let user = [
  {
    name: "John Doe",
    profilePicture: "../../../public/images/user.png",
    email: "rev@gmail.com",
    status: "admin",
    vote_status: "No",
  },
];

const initialVotes = [
  { id: 1, votes: 24, voters: [] },
  { id: 2, votes: 0, voters: [] },
  { id: 3, votes: 0, voters: [] },
  { id: 4, votes: 0, voters: [] },
  { id: 5, votes: 0, voters: [] },

  // Add more vote objects here
];

// API endpoints
app.get("/api/user", (req, res) => {
  res.json(user);
});

app.get("/api/votes", (req, res) => {
  res.json(initialVotes);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post("/api/user", (req, res) => {
  const { name, email } = req.body;
  const existingUser = user.find((u) => u.name === name && u.email === email);

  if (existingUser) {
    res.json(existingUser);
  } else {
    const newUser = {
      name,
      profilePicture: "../../../public/images/user.png",
      email,
      status: "user",
      vote_status: "No",
    };
    user.push(newUser);
    res.json(newUser);
  }
});

app.post("/api/logout", (req, res) => {
  user = [];
  res.status(200).send("Logged out successfully");
});
