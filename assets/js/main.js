import { encryptCaesar, decryptCaesar, CAESAR_PATTERN } from "./caesar_cypher.js";
import { encryptContentPattern, decryptContentPattern, KEYS, SHIFT_KEYS } from "./pattern_cypher.js";
import { onClip } from "./clipboard.js";
import { onTestInput } from "./validation.js";
import { contents } from "./contents.js";

const CYPHER_TYPES = ['pattern', 'caesar'];

// INFORMACOES DAS TRATATIVAS DO CONTEUDO
const onInput = () => document.getElementById(contents.input).value;
const onType = () => document.getElementById(contents.cypherOptions).value;
const output = document.getElementById(contents.output);
const info = document.getElementById(contents.info);
const outputContent = document.getElementById(contents.outputContent);
const outputInfo = document.getElementById(contents.outputInfo);

// BASE PADRAO DE INFORMACOES
let state = {
    step: ''
};

// RESETANDO INFORMACOES
onStdValues();

function onEncrypt() {
    const input = onInput();
    const type = onType();
    let result = '';

    if (input && onTestInput(input, info)) {
        switch (type) {
            case CYPHER_TYPES[0]:
                result = encryptContentPattern(input, KEYS, SHIFT_KEYS);
                break;
            case CYPHER_TYPES[1]:
                result = encryptCaesar(input, CAESAR_PATTERN);
                break;
        }

        if (result) {
            state.step = 'encriptado';
            onShowInfo(result);
        }
    }
}

function onDecrypt() {
    const input = onInput();
    const type = onType();
    let result = '';

    if (input && onTestInput(input, info)) {
        switch (type) {
            case CYPHER_TYPES[0]: 
                result = decryptContentPattern(input, KEYS, SHIFT_KEYS);
                break;
            case CYPHER_TYPES[1]:
                result = decryptCaesar(input, CAESAR_PATTERN);
        }

        if (result) {
            state.step = 'desencriptado';
            onShowInfo(result);
        }
    }
}

function onShowInfo(result) {
    output ? output.innerText = result : null;
    info ? info.innerText = `O texto foi ${state.step}` : 'Apenas letras minúsculas e sem acento.';
    outputContent ? outputContent.style.display = 'flex' : null;
    outputInfo ? outputInfo.style.display = 'none' : null;
}

function onStdValues() {
    state.step = '';
    info.innerText = 'Apenas letras minúsculas e sem acento.';
    outputContent ? outputContent.style.display = 'none' : null;
    outputInfo ? outputInfo.style.display = 'flex' : null;
}

// GLOBAL VARIABLES
document.onEncrypt = onEncrypt;
document.onDecrypt = onDecrypt;
document.onClip = onClip;

// VARIAVEIS 
export { state };
