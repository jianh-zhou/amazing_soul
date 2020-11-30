const http = require('http')
http.createServer((req, res) => {
  res.end('111')
}).listen(1234, (err) => {
  if (err) return
  console.log('http://localhost:1234')
})

