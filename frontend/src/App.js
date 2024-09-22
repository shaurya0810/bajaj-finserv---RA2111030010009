import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css'; // Create this file for basic styling

const options = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      if (!Array.isArray(parsedData.data)) {
        throw new Error('Invalid JSON format. "data" should be an array.');
      }
      console.log('Parsed Data:', parsedData); // Log parsed data
      const response = await axios.post('https://bfhl-io3z.onrender.com/bfhl', parsedData);
      console.log('API Response:', response.data); // Log API response
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error); // Log error details
      alert(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  const filteredResponse = () => {
    if (!responseData) return null;
    const { numbers, alphabets, highest_alphabet } = responseData;
    let filtered = {};
    if (selectedOptions.find(option => option.value === 'numbers')) {
      filtered.numbers = numbers.join(', ');
    }
    if (selectedOptions.find(option => option.value === 'alphabets')) {
      filtered.alphabets = alphabets.join(', ');
    }
    if (selectedOptions.find(option => option.value === 'highest_alphabet')) {
      filtered.highest_alphabet = highest_alphabet.join(', ');
    }
    return filtered;
  };

  const renderedResponse = filteredResponse();

  return (
    <div className="App">
    <h1> Shaurya(RA2111030010009) Bajaj Finserv Health Dev Challenge </h1>
      <h1>API Input</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON'
      />
      <button onClick={handleSubmit}>Submit</button>
      <Select
        isMulti
        options={options}
        onChange={setSelectedOptions}
      />
      {renderedResponse && (
        <div>
          <h2>Filtered Response</h2>
          {renderedResponse.numbers && <p>Numbers: {renderedResponse.numbers}</p>}
          {renderedResponse.alphabets && <p>Alphabets: {renderedResponse.alphabets}</p>}
          {renderedResponse.highest_alphabet && <p>Highest Alphabet: {renderedResponse.highest_alphabet}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
