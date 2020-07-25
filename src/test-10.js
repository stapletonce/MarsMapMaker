//Start::::
  const forceEditID0
    return "<METADATA>";

  const forceEditID1
    return "Hello";

  const forceEditID2
    return "There";

  const forceEditID3
    return "<METADATA>";

  const forceEditID4
    return "<METADATA>";

  const forceEditID5
    return "<METADATA>";

  const forceEditID6
    return "My name";

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
  sample_type: <METADATA>,
  original_archive: <METADATA>,
  collection_method: <METADATA>,
  name: <METADATA>,
  platform_name: CRUISE,
  primary_location_type: SAMPLE,
  cruise_field_prgrm: DEVICE,
  collection_start_date: BEGIN_DATE}

let logic = { 
  sample_type:undefined,
  original_archive:undefined,
  collection_method:undefined,
  :undefined,
  :undefined,
  :undefined,
  name:undefined,
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
