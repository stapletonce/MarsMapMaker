//Start::::
const forceEditID0= () => {
let mapMakerHeader = "<METADATA_ADD>"
  return "Scripps";
}
const forceEditID1= () => {
let mapMakerHeader = "FACILITY_CODE"
  return "Meep";
}
const forceEditID2= () => {
let mapMakerHeader = "SHIP_CODE"
  return "1409";
}
const forceEditID3= () => {
let mapMakerHeader = "DEVICE"
  return "Hello there";
}
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
  sample_type: "<METADATA_ADD>",
  current_archive: "<METADATA>",
  igsn: "<METADATA>",
  cruise_field_prgrm: "<METADATA>",
  collection_start_date: "BEGIN_DATE"
}

let logic = { 
  sample_type: forceEditID0,
  current_archive: forceEditID1,
  igsn: forceEditID2,
  cruise_field_prgrm: forceEditID0,
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
