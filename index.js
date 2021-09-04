const application = require('./dist');
fs = require("fs");

module.exports = application;

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT || 3000),
      host: process.env.HOST,
      cors: {
        origin: ['https://norricorp2.github.io', 'http://localhost:5000'],
        methods: 'GET,HEAD,PUT,PATCH,DELETE',
      },
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      // Enable HTTPS
      protocol: 'https',
      key: fs.readFileSync('/home/jnorris/key.pem'),
      cert: fs.readFileSync('/home/jnorris/cert.pem'),
    },
  };
  application.main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
