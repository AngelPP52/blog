const crypto = require('crypto');
console.log(crypto.createHash('md5').update('123444').digest('base64'));