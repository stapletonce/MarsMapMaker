
export const typeField = (f) => {

    let type;

    let numbers = /^[0-9,/.-]*$/;

    if (f === "")
        type = "both";
    else if (f === "<METADATA_ADD>") {
        type = "added_card"
    }
    else if (numbers.test(f) === true)
        type = "numbers";
    else
        type = "text"
    return type
}