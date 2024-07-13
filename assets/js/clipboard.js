import { contents } from "./contents.js";
import { state } from "./main.js";

const info = document.getElementById(contents.info);
const outputContent = document.getElementById(contents.outputContent);
const outputInfo = document.getElementById(contents.outputInfo);

const CLIPBOARD_DURATION = 3000;

export function onClip() {
    const okInfo = `O texto ${state.step} foi cópiado com sucesso!`;
    const errInfo = `Algo deu errado ao tentar cópiar o texto ${state.step}`;

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
                state.step = '';
                info.innerText = 'Apenas letras minúsculas e sem acento.';
                outputContent ? outputContent.style.display = 'none' : null;
                outputInfo ? outputInfo.style.display = 'flex' : null;
            }
        }, interval);
    }
}