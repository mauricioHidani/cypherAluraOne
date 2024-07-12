// BASE DE INFORMACOES PARA A CRIPTOGRAFIA
const KEYS = ['e', 'i', 'a', 'o', 'u'];
const SHIFT_KEYS = ['enter', 'imes', 'ai', 'ober', 'ufat'];
const CAESAR_PATTERN = 6;
const CLIPBOARD_DURATION = 3000;

const CYPHER_TYPES = ['pattern', 'caesar'];

// INFORMACOES DAS TRATATIVAS DO CONTEUDO
const onInput = () => document.getElementById('input').value;
const output = document.getElementById('output');
const onType = () => document.getElementById('cypher-option').value;
const info = document.getElementById('info-content');
const outputContent = document.getElementById('output-content');
const outputInfo = document.getElementById('info-output');

// BASE PADRAO DE MENSAGENS
const STD_INFO_MSG = 'Apenas letras minúsculas e sem acento.';

// INFORMACOES
let step = '';
onStdContainerValues();

function onStdContainerValues() {
    step = '';
    info.innerText = STD_INFO_MSG;
    outputContent ? outputContent.style.display = 'none' : null;
    outputInfo ? outputInfo.style.display = 'flex' : null;
}

function onEncrypt() {
    const input = onInput();
    const type = onType();
    let result = '';

    if (input) {
        switch (type) {
            case CYPHER_TYPES[0]:
                result = encryptContentPattern(input, KEYS, SHIFT_KEYS);
                break;
            case CYPHER_TYPES[1]:
                result = encryptCaesar(input, CAESAR_PATTERN);
                break;
        }

        if (result) {
            step = 'encriptado';
            onShowInfo(result);
        }
    }
}

function onDecrypt() {
    const input = onInput();
    const type = onType();
    let result = '';

    if (input) {
        switch (type) {
            case CYPHER_TYPES[0]: 
                result = decryptContentPattern(input, KEYS, SHIFT_KEYS);
                break;
            case CYPHER_TYPES[1]:
                result = decryptCaesar(input, CAESAR_PATTERN);
        }

        if (result) {
            step = 'desencriptado';
            onShowInfo(result);
        }
    }
}

function onClip() {
    const okInfo = `O texto ${step} foi cópiado com sucesso!`;
    const errInfo = `Algo deu errado ao tentar cópiar o texto ${step}`;

    navigator.clipboard.writeText(output.innerText)
        .then(() => onShowInfoTimer(info, okInfo, CLIPBOARD_DURATION))
        .catch((err) => info ? info.innerHTML = errInfo : null);
}

function onShowInfoTimer(info, message, duration) {
    const interval = 1000;
    let remaining = duration;

    if (info) {
        info.innerHTML = `${message} (irá sumir em ${duration/1000}s)`;
        const intervalID = setInterval(() => {
            remaining -= interval;
            info.innerHTML = `${message} (irá sumir em ${remaining/1000}s)`;

            if (remaining <= 0) {
                clearInterval(intervalID);
                onStdContainerValues();
            }
        }, interval);
    }
}

function onShowInfo(result) {
    output ? output.innerText = result : null;
    info ? info.innerText = `O texto foi ${step}` : STD_INFO_MSG;
    outputContent ? outputContent.style.display = 'flex' : null;
    outputInfo ? outputInfo.style.display = 'none' : null;
}

function encryptContentPattern(input, keys, shiftKeys) {
    return input.toLowerCase().split('').map((char) => {
        if (keys.includes(char)) {
            const index = keys.indexOf(char);
            return shiftKeys[index];
        } 
        return char;
    }).join('');
}

function decryptContentPattern(input, keys, shiftKeys) {
    let result = input;
    shiftKeys.forEach((key, index) => {
        if (result.includes(key)) {
            result = result.replace(new RegExp(key, 'g'), keys[index]);
        }
    });
    return result;
}

function encryptCaesar(input, pattern) {
    return input.split('').map((char) => {
        const crrCode = char.charCodeAt(0);
        if (crrCode >= 97 && crrCode <= 122) {
            return String.fromCharCode((crrCode - 97 + pattern) % 26 + 97);
        }
        return char;
    }).join('');
}

function decryptCaesar(input, pattern) {
    return input.split('').map((char) => {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) { 
            return String.fromCharCode((charCode - 97 - pattern + 26) % 26 + 97);
        }
        
        return char;
    }).join('');
}
