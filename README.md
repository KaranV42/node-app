# Code Flow Explanation

## Frontend (`index.html` and `main.js`)

### 1. HTML Structure
- A simple form is presented to the user, asking for an `amount` and `currency` (e.g., USD) to authorize a payment. The form uses the `onsubmit` event to call the `authorizePayment` function in `main.js`.

### 2. Payment Authorization Logic (`main.js`)
- **Form Submission**: When the form is submitted, the `authorizePayment` function is triggered, preventing the default form submission.
- **Input Validation**: 
  - `amount` is checked to ensure it's a positive number.
  - `currency` is validated using the `currency-code` library to confirm it matches a valid ISO currency code.
- **Error Handling**: If the inputs are invalid, an error message is displayed to the user.
- **API Request**: If the inputs are valid, a `POST` request is sent to the backend to initiate the payment authorization process.
- **Response Handling**: 
  - If the backend responds successfully, the payment authorization details are logged to the console.
  - If there is an error, an error message is displayed.

## Backend (`index.js`)

### 1. Server Setup
- A basic Express.js server is created to handle payment requests. The `dotenv` library is used to manage environment variables like API keys.

### 2. Request Validation
- The `zod` library is used to validate incoming requests. The `amount` must be a positive number, and `currency` must be a valid ISO currency code.

### 3. Payment Session Creation
- The backend handles the `/pay` route, expecting an `amount` and `currency` in the request body.
- An API request is made to the Windcave service to create a payment session using the provided `amount` and `currency`.
- The request includes necessary headers, such as the API key (in Base64 format) and `Content-Type`.
- If successful, the server extracts the Hosted Payment Page (HPP) link from the Windcave response and sends it back to the frontend.
- If an error occurs, the error is returned to the frontend.

## Backend (`query-session.js`)

### 1. Session Query
- This script is designed to check the status of a payment session using the Windcave API.
- It sends a `GET` request to Windcave using the `sessionId`.
- **Response Handling**:
  - If the session is complete (`status` 200), it checks for transactions associated with the session.
  - If transactions are found, it determines if the latest transaction was authorized.
  - If the session is still pending (`status` 202), it retries the request after a delay.
  - Any errors encountered during the request are logged.

## Incomplete Parts
- Since the Windcave API has not been accessed yet, some parts of the code, such as the actual response structure from Windcave and proper session handling, may need adjustments once the API is accessible.
- Error handling might also need refinement based on actual API responses.

---


