
http.createServer(function (req, res) {
    const urlPath = url.parse(req.url).pathname;
    if (req.urlPath === '/users1' && req.method === 'DELETE') {
        handleDeleteBook(req, res);
    } else {
        loadPage(urlPath, res);
    }
}).listen(4000, function () {
    console.log("Server started at port 4000");
});
async function handleDeleteBook(req, res) {
      if (req.method === 'DELETE') {
          let body = '';
  
          req.on('data', chunk => {
              body += chunk.toString();
          });
  
          req.on('end', async () => {
              try {
                  const parsedBody = JSON.parse(body);
                  const programId = parsedBody.programId;
  
                  if (!ObjectId.isValid(programId)) {
                      res.writeHead(400, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ error: 'Invalid program ID' }));
                      return;
                  }
  
                  const uri = 'mongodb://localhost:27017';
                  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
                  try {
                      await client.connect();
                      const db = client.db('your-database-name');
                      const result = await db.collection('courses').findOneAndDelete({ _id: new ObjectId(programId) });
  
                      if (result.value) {
                          res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ message: 'Book deleted successfully' }));
                      } else {
                          res.writeHead(404, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ error: 'Book not found' }));
                      }
                  } catch (dbErr) {
                      res.writeHead(500, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ error: 'Failed to delete book', details: dbErr }));
                  } finally {
                      await client.close();
                  }
              } catch (parseErr) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Invalid JSON in request body', details: parseErr }));
              }
          });
        }
      } 
