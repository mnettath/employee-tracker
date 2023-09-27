const http = require("http");
const mysql = require("mysql2");

const PORT = 3001;

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db`)
);

const server = http.createServer((req, res) => {
  res.end("Hello, World!"); // end the response and send data back to client
});

server.listen(PORT, () => {
  console.log(`API Server is listening on ${PORT}`);
});
