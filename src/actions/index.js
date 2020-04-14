export const selectedField = (list, field) => {

    return {
        type: 'MAPPED_VALUE',
        payload: {
            sesarTitle: list.title,
            sesarValue: field.value
        }
    }
}