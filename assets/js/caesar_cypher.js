// Criptografia usando a técnica do Cesar, movendo a posição do caracter atual
// para a posição do padrão

// BASE DE INFORMACOES PARA A CRIPTOGRAFIA
export const CAESAR_PATTERN = 6;

export function encryptCaesar(input, pattern) {
    return input.split('').map((char) => {
        const crrCode = char.charCodeAt(0);
        if (crrCode >= 97 && crrCode <= 122) {
            return String.fromCharCode((crrCode - 97 + pattern) % 26 + 97);
        }
        return char;
    }).join('');
}

export function decryptCaesar(input, pattern) {
    return input.split('').map((char) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) { 
            return String.fromCharCode((charCode - 97 - pattern + 26) % 26 + 97);
        }
        
        return char;
    }).join('');
}
