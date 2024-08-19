import currencyCode from 'currency-code';
async function authorizePayment(event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const currency = document.getElementById('currency').value.toUpperCase();
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.textContent = '';

  const validAmount = !isNaN(amount) && amount > 0;
  const validCurrencies = currencyCode.isValid(currency);

  if (validAmount && validCurrencies) {
      try {
          const response = await fetch('https://my-backend-url', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount, currency }),
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Payment authorized:', data);
      } catch (error) {
          errorMessage.textContent = 'Failed to authorize payment: ' + error.message;
      }
  } else {
      errorMessage.textContent = 'Invalid amount or currency. Please check your input.';
  }
}
