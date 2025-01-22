import fetch, { RequestInit } from 'node-fetch';  // Importing RequestInit for typing
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const url: string = 'https://api.lightxeditor.com/external/api/v1/hairstyle';
const apiKey: string | undefined = process.env.LIGHTX_API_KEY;

if (!apiKey) {
    throw new Error('API key is not defined. Please check your .env file.');
}

const data = {
    imageUrl: "https://example.com/your-image.jpg",
    textPrompt: "YourInputPrompt"
};

const options: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
    },
    body: JSON.stringify(data)
};

fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status code ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Request was successful!');
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
