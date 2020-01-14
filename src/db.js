let mysql = require('mysql')

let con = mysql.createConnection({
    host: 'notch-db-do-user-6629666-0.db.ondigitalocean.com',
    port: '25060',
    user: 'doadmin',
    password: 'qwoijru7fn4ghvhj',
    database: 'notch_crm',
    charset: 'utf8mb4',
    insecureAuth: false
})

con.connect((err)=> {
    if(err) {
        return 'DB connection failed'
    }
})

module.exports = con