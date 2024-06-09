const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ecoomerce-website-backend.vercel.app',
      changeOrigin: true,
    })
  );
};    