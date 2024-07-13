// Criptografia usando a técnica de de padrão para mudar cada letra com um
// conjunto de letras

// BASE DE INFORMACOES PARA A CRIPTOGRAFIA
export const KEYS = ['e', 'i', 'a', 'o', 'u'];
export const SHIFT_KEYS = ['enter', 'imes', 'ai', 'ober', 'ufat'];

export function encryptContentPattern(input, keys, shiftKeys) {
    return input.toLowerCase().split('').map((char) => {
        if (keys.includes(char)) {
            const index = keys.indexOf(char);
            return shiftKeys[index];
        } 
        return char;
    }).join('');
}

export function decryptContentPattern(input, keys, shiftKeys) {
    let result = input;
    shiftKeys.forEach((key, index) => {
        if (result.includes(key)) {
            result = result.replace(new RegExp(key, 'g'), keys[index]);
        }
    });
    return result;
}
