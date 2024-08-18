const express = require("express");
const app = express();
const { z } = require("zod");

const schema = z.object({});

app.get("/pay", (req, res) => {});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
