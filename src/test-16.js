//Start::::
const forceEditID0= () => {
let mapMakerHeader = "<METADATA_ADD>"
  return "Scripps";
}
const forceEditID1= () => {
let mapMakerHeader = "SHIP_CODE"
  return "Bowring";
}
const forceEditID2= () => {
let mapMakerHeader = "PLATFORM"
  return "Julius";
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
  current_archive: "FACILITY_CODE",
  latitude: "<METADATA>",
  name: "<METADATA>",
  collector: "CRUISE",
  collection_start_date: "BEGIN_DATE",
  field_name: [ "SAMPLE",  "DEVICE" ]
}

let logic = { 
  sample_type: forceEditID0,
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
