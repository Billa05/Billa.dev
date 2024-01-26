// test.js
const fetchData = require('./FetchData');

fetchData()
    .then(activity => console.log(activity))
    .catch(error => console.error('Error:', error));