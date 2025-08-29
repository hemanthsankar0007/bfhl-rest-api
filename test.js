// Test script for BFHL API
const http = require('http');

function testAPI(testName, data) {
  const postData = JSON.stringify({ data });
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/bfhl',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log(`\n=== ${testName} ===`);
  console.log('Request:', { data });

  const req = http.request(options, (res) => {
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', JSON.parse(responseData));
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// Test Example A
setTimeout(() => {
  testAPI('Example A', ["a","1","334","4","R", "$"]);
}, 500);

// Test Example B
setTimeout(() => {
  testAPI('Example B', ["2","a", "y", "4", "&", "-", "*", "5","92","b"]);
}, 1000);

// Test Example C
setTimeout(() => {
  testAPI('Example C', ["A","ABcD","DOE"]);
}, 1500);

// Test with mixed case and numbers
setTimeout(() => {
  testAPI('Mixed Test', ["Hello", "123", "world", "456", "@", "#", "Test"]);
}, 2000);
