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
  cruise_field_prgrm: FACILITY_CODE,
  latitude: SHIP_CODE,
  name: PLATFORM,
  collection_method: CRUISE,
  collector: DEVICE,
  collection_start_date: BEGIN_DATE,
  latitude_end: LON,
  igsn: fr_site_deductible,
  longitude: point_latitude,
  longitude_end: point_longitude,
  primary_location_type: line,
  geological_age: [ "WATER_DEPTH"],
  size: ["LAT"]
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
