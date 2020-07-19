//Start::::
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

const scrippsDate = (scrippsValue) => {
  const y  =  "19" + scrippsValue.substr(0,2)
  const d = scrippsValue.substr(6,2)
  const m = scrippsValue.substr(3,2)
  return y + '-' + m + '-' + d + 'T00:00:00Z'
}

let map = {
  original_archive: FACILITY_CODE,
  igsn: SHIP_CODE,
  collection_start_date: BEGIN_DATE,
  description: ["PLATFORM"]
}

let logic = {
  collection_start_date: scrippsDate,  
  collection_end_date: scrippsDate,
  geological_age: keyValueString,
  field_name: keyValueString, 
  description: keyValueString,
  sample_comment: keyValueString,
  size: keyValueString
  }

let combinations = {
  field_name: delimit,
  description: delimit,
  geological_age: delimit,
  sample_comment: delimit,
  size: delimit
}

return {map, logic, combinations}
