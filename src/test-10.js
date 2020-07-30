//Start::::
const forceEditID0
  return "scripps";

const forceEditID1
  return "hello";

const forceEditID2
  return "howareyou";

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
  current_archive: "<METADATA_ADD>",
  original_archive: "<METADATA>",
  platform_name: "<METADATA>",
  cruise_field_prgrm: "CRUISE",
  collection_start_date: "BEGIN_DATE",
  latitude: "LAT",
  longitude: "LON",
  collector: "PI",
  sample_type: "SHOW_SAMPL",
  field_name: [ "STORAGE_METH" ],
  sample_comment: [ "SAMPLE" ],
  description: [ "LEG" ],
  size: [ "WATER_DEPTH",  "CORED_LENGTH",  "CORED_LENGTH_MM",  "CORED_DIAM" ]
}

let logic = { 
  current_archive:undefined,
  original_archive:undefined,
  platform_name:undefined,
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
