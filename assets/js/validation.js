const REGEX = new RegExp('^[a-z0-9!@#$%^&*(),.?":{}|<>]*$');

export function onTestInput(input, info) {
    if (!REGEX.test(input)) {
        info.innerText = 'Sua mensagem deve conter apenas letras minúsculas e sem acento.'
        info.style.color = '#ff6361';
        return false;
    } else {
        info.style.color = '#343A40';
        return true;
    }
}
