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
  name: FACILITY_CODE,
  latitude_end: SHIP_CODE,
  collection_method: PLATFORM,
  primary_location_type: CRUISE,
  longitude_end: LON,
  latitude: fl_site_limit,
  sample_comment: ["DEVICE", "PI"]
  size: ["hu_site_limit", "tiv_2012"]
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
