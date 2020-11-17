// catch exceptions:
// comment out for jest testing
// process.on('uncaughtException', (err) => {
//   console.log('Unhandled exception. Shutting down');
//   console.log(err.stack);
//   process.exit(1);
// });

const app = require('./app');

// create server:
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // console.log('CORS-enabled App running on port', port);
});

module.exports = server;
