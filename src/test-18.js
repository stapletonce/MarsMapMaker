//Start::::
const forceEditID0 = () => {
let mapMakerHeader = "ADDED_CARD : 1"
  return "Ocean";
}
const forceEditID1 = () => {
let mapMakerHeader = "FACILITY_CODE"
  return "Scripps";
}
const forceEditID2 = () => {
let mapMakerHeader = "SHIP_CODE"
  return "Meep";
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
  original_archive: "<METADATA>",
  current_archive: "<METADATA>",
  collection_start_date: "BEGIN_DATE"
}

let logic = { 
  sample_type: forceEditID0,
  original_archive: forceEditID1,
  current_archive: forceEditID2,
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
