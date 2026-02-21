const express = require('express');
const fs = require('fs');
const querystring = require('querystring');
const { connectToDb, getDb } = require('./ConnectMongoDB');
const dt = require('./database1.js');

const app = express();
const port = 3000;

let db;

// Connect to MongoDB
connectToDb((err) => {
    if (!err) {
        app.listen(port, () => {
            console.log("Server started on port 3000");
        });
        db = getDb();
    }
});

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Function to load HTML files
function loadpage(url, res) {
    fs.readFile(url, function (err, data) {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal server error');
            return;
        }
        res.write(data);
        return res.end();
    });
}

app.get('/', (req, res) => {
    loadpage('./index1.html', res);
});

app.get('/courses', (req, res) => {
    let records = [];
    db.collection('courses')
        .find({ "program": "Bca" })
        .sort({ program: 1 })
        .forEach(record => records.push(record))
        .then(() => {
            if (records.length === 0) {
                res.send("No course data found");
                return;
            }
            res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } .career-option { margin-bottom: 10px; background-color: #ffffff; padding: 10px; border-radius: 5px; } </style>");
            res.write("<h1 style='color: #2196F3;'>BCA WINNER PATH</h1>");
            res.write("<div class='section'>");
            res.write("<div class='title'>Program Name</div>");
            res.write("<div class='content'>" + records[0].program + "</div>");
            res.write("</div>");
            res.write("<div class='section'>");
            res.write("<div class='title'>Image</div>");
            res.write("<img src='https://images.shiksha.com/mediadata/images/articles/1705860839phpYaPORt.jpeg' alt='Description of the image' style='max-width: 2000px; height: 600px;'>");
            res.write("</div>");

            records[0].desc.forEach(phase => {
                res.write("<div class='section'>");
                res.write("<div class='title'>" + phase.phase + "</div>");
                res.write("<div class='title'>Simplified Description</div>");
                res.write("<div class='content'>" + phase.simplified_description + "</div>");

                if (phase.phase === "Exploring Career Options") {
                    res.write("<div class='section'>");
                    res.write("<div class='title'>Career Options</div>");
                    res.write("<div class='content'>");
                    phase.options.forEach(option => {
                        res.write("<div class='career-option'><strong>" + option.career_option + "</strong>: " + option.description + "</div>");
                    });
                    res.write("</div>");
                    res.write("</div>");
                }
                res.write("</div>");
            });

            res.end();
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' });
        });
});

app.get('/courses1', (req, res) => {
    let records = [];
    db.collection('courses')
        .find({ "program": "Bca" })
        .sort({ program: 1 })
        .forEach(record => records.push(record))
        .then(() => {
            if (records.length === 0) {
                res.send("No course data found");
                return;
            }
            res.write("<style> body { font-family: Verdana, sans-serif; } .section { margin-bottom: 20px; background-color: #f2f2f2; padding: 10px; border-radius: 5px; } .title { font-size: 20px; color: #2196F3; margin-bottom: 10px; } .content { margin-left: 20px; } </style>");
            res.write("<h1 style='color: #2196F3;'>BCA WINNER PATH - Phase 2</h1>");
            res.end();
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' });
        });
});

app.get('/Courses2', (req, res) => {
    let records = [];
    db.collection('courses')
        .find({ "program": "Bca" })
        .sort({ program: 1 })
        .forEach(record => records.push(record))
        .then(() => {
            res.write("<h1>BCA Roadmap - Phase 3</h1>");
            res.end();
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' });
        });
});

app.get('/Courses3', (req, res) => {
    res.write("<h1>BCA Roadmap - Phase 4</h1>");
    res.end();
});

app.get('/Courses4', (req, res) => {
    res.write("<h1>BCA Roadmap - Phase 5</h1>");
    res.end();
});

app.get('/Courses5', (req, res) => {
    res.write("<h1>BCA Roadmap - Phase 6</h1>");
    res.end();
});

app.get('/registration', (req, res) => {
    loadpage('./registration.html', res);
});

app.get('/aboutus1', (req, res) => {
    loadpage('./aboutus1.html', res);
});

app.get('/contactus', (req, res) => {
    loadpage('./contactus.html', res);
});

app.get('/display', (req, res) => {
    loadpage('./display.html', res);
});

app.get('/add', (req, res) => {
    loadpage('./add.html', res);
});

app.get('/remove', (req, res) => {
    loadpage('./remove.html', res);
});

app.get('/roadmap/BCA', (req, res) => {
    loadpage('./bca_roadmap.html', res);
});

app.post('/registrationsave', (req, res) => {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });

    req.on('end', () => {
        const postData = querystring.parse(formData);
        var passdata = JSON.stringify({ username: postData.txtname, email: postData.txtemail, password: postData.txtpwd, age: postData.txtage, levelofstudy: postData.txtug });
        var status = dt.registrationinsert(passdata);
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ADD8E6;
      color: #333;
    }
    .message {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message h1 {
      color: #007bff;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>Registration successful!</h1>
  </div>
</body>
</html>
        `);
    });
});

app.post('/addsave', (req, res) => {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });

    req.on('end', () => {
        const postData = querystring.parse(formData);
        var passdata = JSON.stringify({ _id: postData.id, program: postData.program, description: postData.description, shorttermgoal: postData.shorttermgoals, longtermgoal: postData.longtermgoals, careerexploration: postData.careerexploration, competitiveexam: postData.competitiveexam });
        var status = dt.coursesinsert(passdata);
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Updated</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ADD8E6;
      color: #333;
    }
    .message {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message h1 {
      color: #007bff;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>Updated</h1>
  </div>
</body>
</html>
        `);
    });
});

app.post('/contactsave', (req, res) => {
    let formData = '';
    req.on('data', (chunk) => {
        formData += chunk;
    });

    req.on('end', () => {
        const postData = querystring.parse(formData);
        var passdata = JSON.stringify({ username: postData.txtname, email: postData.txtemail, number: postData.txtnum });
        var status = dt.contactinsert(passdata);
        res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Will Get Back</title>
  <style>
    body {
      font-family: 'Montserrat', sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ADD8E6;
      color: #333;
    }
    .message {
      background-color: #f0f0f0;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .message h1 {
      color: #007bff;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="message">
    <h1>We Will Get Back</h1>
  </div>
</body>
</html>
        `);
    });
});
