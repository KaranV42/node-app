const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const acuity = axios.create({
    baseURL: 'https://acuityscheduling.com/api/v1',
    auth: {
        username: "33176523",
        password: "c7d88ea02f98f278268d3ba0d7b42187",
    },
});

let appointments = {};

app.post('/acuity-webhook', (req, res) => {
    const appointmentId = req.body.id;
    const action = req.body.action;

    appointments[appointmentId] = { action, appointmentId };

    console.log(`Received ${action} webhook for appointment ID: ${appointmentId}`);
    res.status(200).send('Webhook received');
});

app.post('/retrieve-appointment', async (req, res) => {
    const { appointmentId } = req.body;

    if (appointments[appointmentId]) {
        try {
            const response = await acuity.get(`/appointments/${appointmentId}`);
            const appointment = response.data;

            appointments[appointmentId] = {
                ...appointments[appointmentId],
                details: appointment,
            };

            const amount = appointment.price || '0.00';
            const currency = appointment.currency || 'USD'; 

            res.json({ amount, currency });
        } catch (error) {
            console.error('Error retrieving appointment:', error.message);
            res.status(500).json({ error: 'Failed to retrieve appointment details' });
        }
    } else {
        res.status(404).json({ error: 'Appointment not found' });
    }
});

app.get('/redirect-to-payment', (req, res) => {
    const { appointmentId, amount, currency } = req.query;
    const windcaveUrl = `https://www.windcave.com/`;
    res.redirect(windcaveUrl);
});

app.listen(80, () => {
    console.log('Server running on port 80');
});
