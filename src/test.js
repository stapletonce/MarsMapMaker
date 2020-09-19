//Start::::
const forceEditID0 = () => {
let mapMakerHeader = "<METADATA_ADD>"
  return "Scripps Ocean Institute";
}
const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

let map = {
  sample_type: "<METADATA_ADD>",
  igsn: "SHIP_CODE",
  cruise_field_prgrm: "PLATFORM",
  name: "CRUISE"
}

let logic = { 
  sample_type: forceEditID0,
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
