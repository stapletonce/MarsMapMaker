//Start::::
const size = (scrippsValue, scrippsKey) => {
  let chosenPrecision =[]
  return chosenPrecision.includes(scrippsKey) ? scrippsValue/10 : scrippsValue
}

const keyValueString = (scrippsValue, scrippsKey) => {
  return scrippsKey + ' : ' + scrippsValue
}

const delimit = (valueArray) => {
  return valueArray.join(';')
}

const summate = () => {
  const singleMeasure = [
]
  const pairMeasure = []
  let singleJoin = ""
   for (let i = 0; i < singleMeasure.length; i++) {
    singleJoin = singleJoin + singleMeasure[i].header + " = " singleMeasure.Value[i] +  "; "
   }
  let pairJoin = ""
   for (let i = 0; i < pairMeasure; i++) {
    pairJoin = pairJoin + "(" + pairMeasure[i].firstHeader + " + " + pairMeasure[i].secondHeader + ")" + " = " + pairMeasure[i].firstValue + "." + pairMeasure[i].secondValue + "; " 
   }
 return singleMeasure + pairMeasure
}
const scrippsDate = (scrippsValue) => {
  const y  =  "" + scrippsValue.substr(0,4)
  const d = scrippsValue.substr(6,2)
  const m = scrippsValue.substr(4,2)
  return y + '-' + m + '-' + d + 'T00:00:00Z'
}

let map = {
  original_archive: FACILITY_CODE,
  platform_name: PLATFORM,
  collection_start_date: BEGIN_DATE,
  description: ["SAMPLE"]
}

let logic = {
  collection_start_date: scrippsDate,  
  collection_end_date: scrippsDate,
  field_name: keyValueString, 
  description: keyValueString,
  sample_comment: keyValueString,
  size: size
  }

let combinations = {
  field_name: delimit,
  description: delimit,
  sample_comment: delimit,
  size: summate
}

return {map, logic, combinations}
