const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line

const USER_ID = "john_doe_17091999"; // Replace with your actual user ID

// Example data
const examples = {
    exampleA: {
        request: { "data": ["M", "1", "334", "4", "B"] },
        response: {
            is_success: true,
            user_id: USER_ID,
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: ["1", "334", "4"],
            alphabets: ["M", "B"],
            highest_alphabet: ["M"]
        }
    },
    exampleB: {
        request: { "data": ["2", "4", "5", "92"] },
        response: {
            is_success: true,
            user_id: USER_ID,
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: ["2", "4", "5", "92"],
            alphabets: [],
            highest_alphabet: []
        }
    },
    exampleC: {
        request: { "data": ["A", "C", "z"] },
        response: {
            is_success: true,
            user_id: USER_ID,
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: [],
            alphabets: ["A", "C", "z"],
            highest_alphabet: ["z"]
        }
    }
};

// POST /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];

        const numbers = data.filter(item => !isNaN(item)).map(Number);
        const alphabets = data.filter(item => isNaN(item));
        const highest_alphabet = alphabets.length > 0
            ? [alphabets.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).pop()]
            : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers: numbers,
            alphabets: alphabets,
            highest_alphabet: highest_alphabet
        });
    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "An error occurred."
        });
    }
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// GET /examples
app.get('/examples', (req, res) => {
    res.status(200).json(examples);
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
