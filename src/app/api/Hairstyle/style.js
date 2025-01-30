const fetch = require('node-fetch');  // Only needed if you are using Node.js

const url = 'https://api.lightxeditor.com/external/api/v1/hairstyle';
const apiKey = 'c366ad266f1845579eef1b041cc3af33_0975b60ee81d442296daa1e5b2f109fb_andoraitools';  // Replace with your actual API key

const data = {
"imageUrl": "https://example.com/your-image.jpg",  // Replace with the URL of your input image
"textPrompt": "YourInputPrompt"  // Replace with your specific input prompt
};

const options = {
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

