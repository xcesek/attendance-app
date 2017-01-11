var attendance = require('./models/attendance');
var config = require('../config/config');

var mysql = require('mysql');

var pool = mysql.createPool({
    host: config.db.uri,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

function getDataFromDb(pool, queryStr, res) {
    
    pool.getConnection(function (err, conn) {
        conn.query(queryStr, function (err, rows) {
            if (!err) {
                if (rows.length > 0) {
                    var data = rows;
                    data.forEach(function (entry) {
                        entry.changed_at = new Date(entry.changed_at).toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    });
                    res.write(JSON.stringify(rows));
                    res.end();

                } else {
                    rows = [];
                    res.write(JSON.stringify(rows));
                    res.end();
                }

            } else {
                console.log("Query failed");
            }
            conn.release();
        });
    });
}

function formQueryStrBasedOnType(type) {
    var queryStr;
    switch (type) {
        case 'day':
            queryStr = 'SELECT * FROM ATTENDANCE where DATE(changed_at) = CURDATE() order by changed_at desc'
            break;
        case 'week':
            queryStr = 'SELECT * FROM ATTENDANCE where DATE(changed_at) >= DATE_ADD(CURDATE(), INTERVAL -7 DAY) order by changed_at desc'
            break;
        case 'month':
            queryStr = 'SELECT * FROM ATTENDANCE where DATE(changed_at) >= DATE_ADD(CURDATE(), INTERVAL -30 DAY) order by changed_at desc'
            break;
        case 'all':
            queryStr = 'SELECT * FROM ATTENDANCE';
            break;    
        case 'limit':
            queryStr = 'SELECT * FROM ATTENDANCE order by changed_at desc limit 100';
            break;
        default:
            queryStr = 'SELECT * FROM ATTENDANCE limit 100';
    }

    return queryStr;
}

module.exports = {
    processFindRequest: function (res, type) {
        var queryStr = formQueryStrBasedOnType(type);
        getDataFromDb(pool, queryStr, res);
    }
};