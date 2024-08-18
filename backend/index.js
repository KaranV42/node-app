const express = require('express');
const { z } = require('zod');

const app = express();
app.use(express.json());

const paymentSchema = z.object({
    amount: z.number().positive(),
    currency: z.enum(['USD', 'INR', 'NZD', 'EUR', 'GBP', 'AUD', 'CAD']),
});

app.post('/api/payments', (req, res) => {
    try {
        const parsedData = paymentSchema.parse(req.body);
        res.status(200).json({ message: 'Payment authorized', data: parsedData });
    } catch (error) {
        res.status(400).json({ error: error.errors });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
