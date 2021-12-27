export const validationEmail = (email) => {
    let reg = /\S+@\S+\.\S+/;
    return reg.test(email); // Retorna true se valido
}

export const validationPassword = (password) =>  {
    // Mínimo de 6 e máximo de 8 caracteres, pelo menos uma 
    // letra maiúscula, uma letra minúscula, um número e um caractere especial
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
    return reg.test(password); // Retorna true se valido
}

export const validationName = (name) => {
    if (name.trim().split(" ").length <= 1) {
        return false;
    } 
    return true; // Retorna true se valido
}