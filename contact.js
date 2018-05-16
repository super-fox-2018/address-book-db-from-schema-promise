const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./addressBook.db')
const fs = require('fs')

function contact(){
    return new Promise(function(resolve, reject){
        fs.readFile('./contacts.json','utf8', function(err, dataDummy){
            if (err){
                reject(err)
            }
            else{
                let data = JSON.parse(dataDummy)
                resolve(data)
            }
        })
    })
}

contact()
.then(function(data){
    for(let i=0; i<data.length; i++){
        db.run(`INSERT INTO contacts (first_name, last_name, email, phone, group_name) VALUES ('${data[i].first_name}', '${data[i].last_name}', '${data[i].email}', '${data[i].phone}', '${data[i].group_name}' )`)
    }
})
