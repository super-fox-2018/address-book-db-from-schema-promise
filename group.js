const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./addressBook.db')
const fs = require('fs')

function group(){
    return new Promise(function(resolve, reject){
        fs.readFile('./groups.json', 'utf8', function(err, groups){
            if(err){
                reject(err)
            } 
            else{
                let dataGroup = JSON.parse(groups)
                resolve(dataGroup)
            }
        })
    })
}

group()
.then(function(dataGroup){
    for(let i=0; i<dataGroup.length; i++){
        let add= db.run(`INSERT INTO groups (name) VALUES ('${dataGroup[i].name}')`)
    }
})

