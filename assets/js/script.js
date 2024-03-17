const msg = new SpeechSynthesisUtterance();

const voiceSelector = document.querySelector('#voice');
const rateRange = document.querySelector('#rate');
const pitchRange = document.querySelector('#pitch');
const textarea = document.querySelector('#text');
const toggleBtn = document.querySelector('#toggleVoice');

let voices = [];

function populateVoices() {
    voices = this.getVoices().filter((voice) => {
        return voice.lang.startsWith("pt") || voice.lang.startsWith("en");
    });

    voiceSelector.innerHTML = voices.map((voice, index) => {
        return `<option value="${index}">${voice.name}</option>`;
    }).join('');
}

function toggleSpeak() {
    (speechSynthesis.speaking) ? endSpeak() : startSpeak();
}

function startSpeak() {
    msg.text = textarea.value;
    
    speechSynthesis.speak(msg);
    
    toggleBtn.textContent = "STOP";
    msg.addEventListener('end', endSpeak);
    toggleBtn.classList.add("active");
}

function endSpeak(){
    speechSynthesis.cancel();
    toggleBtn.textContent = "START";
    toggleBtn.classList.remove("active");
}

function setVoice(){
    let voiceId = parseInt(voiceSelector.value);
    msg.lang = voices[voiceId].lang;
    msg.voice = voices[voiceId];
}

function setRate(){
    msg.rate = rateRange.value;
}

function setPitch(){
    msg.pitch = pitchRange.value;
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
toggleBtn.addEventListener('click', toggleSpeak);
rateRange.addEventListener('change', setRate);
pitchRange.addEventListener('change', setPitch);
voiceSelector.addEventListener('change', setVoice);