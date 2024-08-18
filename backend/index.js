const { default: axios } = require("axios");
const express = require("express");
require("dotenv").config();
const app = express();
import { nanoid } from "nanoid";
const { z } = require("zod");

// const schema = z.object({

// });

console.log(process.env.BASE64_API_KEY);

app.post("/pay", (req, res) => {
    const { amount, currency } = req.body;

    axios
        .get("https://sec.windcave.com/api/v1/sessions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + procss.env.BASE64_API_KEY,
            },
            data: {
                type: "purchase",
                amount: amount,
                currency: currency,
                merchantReference: nanoid(
                    "1234567890abcdefghijklmnopqrstuvwxyz",
                    12
                ),
                callbackUrls: {
                    approved: "https://example.com/success",
                    declined: "https://example.com/fail",
                    cancelled: "https://example.com/cancel",
                },
                notificationUrl: "https://example.com/txn_result?123",
            },
        })
        .then((response) => {
            const hpp = response.links.find((link) => link.rel === "hpp").href;
            res.send(hpp);
        })
        .catch((error) => {
            res.send(error);
        });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
