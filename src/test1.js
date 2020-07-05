//Start::::
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

const scrippsDate = (scrippsValue) => {
  const y  =  "" + scrippsValue.substr()
  const d = scrippsValue.substr()
  const m = scrippsValue.substr()
  return y + '-' + m + '-' + d + 'T00:00:00Z'
}

let map = {
  original_archive: FACILITY_CODE,
  igsn: SHIP_CODE,
  cruise_field_prgrm: PLATFORM,
  name: CRUISE}

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
