const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', (req, res) => {
    const { action, id, calendarID, appointmentTypeID } = req.body;

    console.log('Webhook received:', {
        action,
        id,
        calendarID,
        appointmentTypeID,
    });

    if (action === 'scheduled') {
        const windcaveUrl = `https://www.windcave.com/`;
        res.redirect(windcaveUrl);
    } else {
        res.sendStatus(200);
    }

    res.status(200).send('Webhook received');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
