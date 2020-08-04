//Start::::
const forceEditID0= () => {
let mapMakerHeader = "FACILITY_CODE"
  return "Hey";
}
const forceEditID1= () => {
let mapMakerHeader = "SHIP_CODE"
  return "1546"";
}
const forceEditID2= () => {
let mapMakerHeader = "PLATFORM"
  return "Scripps Ocean Institute";
}
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

let map = {
  original_archive: "<METADATA>",
  latitude: "<METADATA>",
  name: "<METADATA>"
}

let logic = { 
  original_archive: forceEditID0,
  latitude: forceEditID1,
  name: forceEditID2,
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
