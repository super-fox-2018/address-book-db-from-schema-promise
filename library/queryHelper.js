
function objToString (objInput, type){
  let query=''
  let firstValue = true
  let numValue


  for(let prop in objInput){
    numValue = Number.isInteger(objInput[prop])

    if(firstValue){
      if(numValue){
        query += ` ${prop} = ${objInput[prop]}`
      }else{
        query += ` ${prop} = '${objInput[prop]}'`
      }
      firstValue = false
    } else {
      if(numValue){
        query += ` ${type} ${prop} = ${objInput[prop]}`
      }else{
        query += ` ${type} ${prop} = '${objInput[prop]}'`
      }
    }
  }
  return query

}

function arrToObj(arrData){
  let obj = {}
  arrData.forEach(function(data, i){
    let valCol = data.split(",")
    let col = valCol[0]
    let val = valCol[1]

    if(col == 'id'){
      val = Number(valCol[1])
    }

    obj[col] = val
  })
  return obj
}

module.exports = {objToString, arrToObj};
