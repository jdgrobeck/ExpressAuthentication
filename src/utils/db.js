const { response } = require('express');
const mysql = require('mysql')
require('dotenv').config();


let connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
  }

);

connection.connect();

// basic promise wrapper if you want to just convert a callback to a promise
connection.queryPromise = (sql, params) => {
  return new Promise( (resolve, reject) => {
    connection.query(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    })

  })
};

// go farther and process the results of the promise and return the results
// helper function middleware instead of installing and learning another promise module
connection.querySync = async (sql, params) => {
  let promise = new Promise ( (resolve, reject) => {
    console.log("Executing query: ", sql);
    connection.query(sql, params, (err, results) => {
      if (err) {
        console.log("rejecting");
        return reject(err);
      } else {
        console.log("resolving");
        return resolve(results);
      }
    })
  })

  let results = await promise.then ( (results) => {
    console.log("results ", results);
    return results;

  }).catch( (err) => {
    throw err;
  })
  return results;
}

// connection.query(sql, callback function)

// (err, rows are normally callback parameters)
//This is a test to see if connection was made

connection.query('select now()', (err, rows) => {
  if (err) {
    console.log('Not Connected ', err);
  } else {
    console.log('Connected ', rows)
  }
});

module.exports = connection;