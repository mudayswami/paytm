const mongoose = require('mongoose');

 function  db_connect(){
     mongoose.connect('mongodb+srv://petoneto00:7XI5Cz4FNkORwDt8@node.28ir6.mongodb.net/paytm?retryWrites=true&w=majority&appName=Node')
    console.log("Database Connected");
}

module.exports = db_connect;
