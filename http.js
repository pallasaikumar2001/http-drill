const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  //html
  if (method === 'GET' && url === '/html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
        </head>
        <body>
            <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
            <p> - Martin Fowler</p>
        </body>
      </html>
    `);
  }
  //json
  else if (method === 'GET' && url === '/json') {
    const jsonResponse = {
      slideshow: {
        author: "Yours Truly",
        date: "date of publication",
        slides: [
          {
            title: "Wake up to WonderWidgets!",
            type: "all"
          },
          {
            items: [
              "Why <em>WonderWidgets</em> are great",
              "Who <em>buys</em> WonderWidgets"
            ],
            title: "Overview",
            type: "all"
          }
        ],
        title: "Sample Slide Show"
      }
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(jsonResponse));
  }

  // uuid
  else if (method === 'GET' && url === '/uuid') {
    const uuid = { uuid: uuidv4() };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(uuid));
  }

  // status
  else if (method === 'GET' && url.startsWith('/status/')) {
    const statusCode = parseInt(url.split('/status/')[1], 10);
    if (!isNaN(statusCode) && statusCode >= 100 && statusCode <= 599) {
      res.writeHead(statusCode);
      res.end(`Response with status code: ${statusCode}`);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid status code');
    }
  }

  // delay
  else if (method === 'GET' && url.startsWith('/delay/')) {
    const delayInSeconds = parseInt(url.split('/delay/')[1], 10);
    if (!isNaN(delayInSeconds) && delayInSeconds > 0) {
      setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Response after ${delayInSeconds} seconds`);
      }, delayInSeconds * 1000);
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid delay duration');
    }
  }

 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
