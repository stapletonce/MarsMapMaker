//Start::::
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

const scrippsDate = (scrippsValue) => {
  const y  =  "" + scrippsValue.substr(0,4)
  const d = scrippsValue.substr(6,2)
  const m = scrippsValue.substr(4,2)
  return y + '-' + m + '-' + d + 'T00:00:00Z'
}

let map = {
  original_archive: FACILITY_CODE,
  igsn: SHIP_CODE,
  platform_name: PLATFORM,
  cruise_field_prgrm: CRUISE,
  collection_method: DEVICE,
  collection_start_date: BEGIN_DATE,
  latitude: LAT,
  longitude: LON,
  field_name: ["PI",  "LEG"]
  sample_comment: [ "SAMPLE"],
  description: ["STORAGE_METH", "statecode",  "county"],
  size: ["WATER_DEPTH", "CORED_LENGTH", "CORED_LENGTH_MM", "policyID"]
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
