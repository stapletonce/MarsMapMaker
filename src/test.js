//Start::::
const forceEditID0 = () => {
let mapMakerHeader = "<METADATA_ADD>"
  return "Scripps";
}
const forceEditID1 = () => {
let mapMakerHeader = "CRUISE"
  return "Hello";
}
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

let map = {
  sample_type: "<METADATA_ADD>",
  current_archive: "<METADATA>"
}

let logic = { 
  sample_type: forceEditID0,
  current_archive: forceEditID1,
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
