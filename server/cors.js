const allowedOrigins = ['http://localhost:3001'];
const HEADERS = [];

const cors = (app) => {
  const baseHeaders = [
    'Origin',
    'Authorization',
    'Content-Type',
    'Accept',
    'LAST-EVENT-ID',
  ];
  const allowedHeaders = baseHeaders.concat(Object.values(HEADERS));
  app.use((req, res, next) => {
    const origin = req.get('Origin');
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, PATCH, POST, DELETE'
      );
      res.header('Access-Control-Allow-Headers', allowedHeaders.join());
      res.header('Access-Control-Expose-Headers', allowedHeaders.join());
    }
    next();
  });
};

module.exports = cors;
