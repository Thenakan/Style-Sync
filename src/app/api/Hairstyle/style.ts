export {};

const response = await fetch('https://yce-api-01.perfectcorp.com/v1/generate-hairstyle', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer QCRpunU7OqlFLlmadzUs1A49PNVeDYJh', // Make sure the key is prefixed with "Bearer"
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: 'BASE64_ENCODED_IMAGE',  // Replace with actual base64 data
      preferences: { length: 'short', color: 'brown' },
    }),
  });
  
  const result = await response.json();
  console.log(result);
  