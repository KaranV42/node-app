const axios = require('axios');

async function querySession(sessionId) {
    try {
        const response = await axios.get(`https://sec.windcave.com/api/v1/sessions/${sessionId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + process.env.BASE64_API_KEY,
            },
        });

        if (response.status === 200) {
            console.log('Session Complete:', response.data);
            const sessionData = response.data;

            if (sessionData.transactions && sessionData.transactions.length > 0) {
                const latestTransaction = sessionData.transactions[0];
                console.log('Latest Transaction:', latestTransaction);

                if (latestTransaction.authorized) {
                    console.log('Payment Authorized:', latestTransaction);
                } else {
                    console.log('Payment Declined:', latestTransaction);
                }
            } else {
                console.log('No transactions found in the session.');
            }
        } else if (response.status === 202) {
            console.log('Session is still pending, trying again...');
            setTimeout(() => querySession(sessionId), 5000); 
        } else {
            console.log('Unexpected status code:', response.status);
        }
    } catch (error) {
        console.error('Error querying session:', error.message);
    }
}

const sessionId = 'your-session-id';
querySession(sessionId);
