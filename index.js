const express = require('express');
const { exec } = require('child_process');
const rateLimit = require('express-rate-limit');



const app = express();

// rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5
});

app.use('/run', limiter);


app.get('/', (req, res) => {
  res.send('Secure Pipeline Lab Running 🚀');
});

/*// 🚨 VULNERABLE ENDPOINT
app.get('/run', (req, res) => {
  const userInput = req.query.cmd;

  exec(userInput, (error, stdout, stderr) => {
    if (error) {
      return res.send(`Error: ${error.message}`);
    }
    res.send(`Output: ${stdout}`);
  });
});
//*/

//VULNERABLE ENDPOINT FIXED
const allowedCommands = ['date', 'uptime'];

app.get('/run', (req, res) => {
  const userInput = req.query.cmd;

  if (!allowedCommands.includes(userInput)) {
    return res.status(400).send('Invalid command');
  }

  exec(userInput, (error, stdout, stderr) => {
    if (error) {
      return res.send(`Error: ${error.message}`);
    }
    res.send(`Output: ${stdout}`);
  });
});


app.listen(3000, () => {
  console.log('Server running on port 3000');
});