var server = require('./source');
var port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('Server running on port %d', port);
});