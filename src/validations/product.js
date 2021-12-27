export const validationDescription = (description) => {
    const reg = /[a-zA-Z]/;
    return reg.test(description); // Retorna true se valido apenas letras
}

export const validationQuantity = (quantity) => {
    const reg = /^\d+$/;
    return reg.test(quantity); // Retorna true se valido apenas numeros
}

export const  validationValueUnitary = (valueUnitary) => {
    const reg = /^[1-9]\d*(\.\d+)?$/;
    return reg.test(valueUnitary); // Retorna true se valido numero real
}