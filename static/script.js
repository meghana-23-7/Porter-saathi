'use strict';

function translate(text) {
    const lang = currentLang;
    const map = {
        'Bhasha badal di gayi hai.': {
            'en-IN': 'Language changed.', 'hi-IN': 'भाषा बदल दी गई है।', 'kn-IN': 'ಭಾಷೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.'
        },
        'Aaj aapne net ₹1190 kamaye. Kul trips 6. Penalties 1.': {
            'en-IN': 'You earned ₹1190 today after expenses. Total trips 6. Penalties 1.',
            'hi-IN': 'आज आपने नेट ₹1190 कमाए। कुल ट्रिप्स 6। पेनल्टी 1।',
            'kn-IN': 'ನೀವು ಇಂದು ಖರ್ಚುಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ₹1190 ಗಳಿಸಿದ್ದೀರಾ. ಒಟ್ಟು ಟ್ರಿಪ್ಸ್ 6. ಪೆನಾಲ್ಟಿ 1.'
        },
        'Haan, aapka business pichle hafte se behtar hai.': {
            'en-IN': 'Yes, your business is better than last week.', 'hi-IN': 'हाँ, आपका व्यवसाय पिछले हफ्ते से बेहतर है।', 'kn-IN': 'ಹೌದು, ನಿಮ್ಮ ವ್ಯವಹಾರ ಕಳೆದ ವಾರದಿಗಿಂತ ಉತ್ತಮವಾಗಿದೆ.'
        },
        'Nahin, pichle hafte se abhi thoda kam hai.': {
            'en-IN': 'No, it is a bit lower than last week right now.', 'hi-IN': 'नहीं, यह अभी पिछले हफ्ते से थोड़ा कम है।', 'kn-IN': 'ಇಲ್ಲ, ಇದು ಈಗ ಕಳೆದ ವಾರದಿಗಿಂತ ಸ್ವಲ್ಪ ಕಡಿಮೆ.'
        },
        'Yeh penalty isliye lagi: Late delivery by 30 mins. Amount ₹50.': {
            'en-IN': 'This penalty was applied because of a late delivery by 30 minutes. Amount ₹50.', 'hi-IN': 'यह पेनल्टी देर से डिलीवरी के कारण लगी (30 मिनट)। राशि ₹50।', 'kn-IN': 'ಈ ದಂಡವನ್ನು 30 ನಿಮಿಷವಾದ ವಿಳಂಬ ಡಿಲಿವರಿಯ ಕಾರಣವಾಗಿ ವಿಧಿಸಲಾಗಿದೆ. ಮೊತ್ತ ₹50.'
        },
        'Mai turant madad bula rahi hoon. Aapko kya hua?': {
            'en-IN': 'I am calling for help immediately. What happened to you?', 'hi-IN': 'मैं तुरंत मदद बुला रही हूँ। आपको क्या हुआ?', 'kn-IN': 'ನಾನು ತಕ್ಷಣ ಸಹಾಯವನ್ನು ಕರೆಸುತ್ತಿದ್ದೇನೆ. ನಿಮಗೆ ಏನಾಯಿತು?'
        },
        'Kripya thoda aur bataiye — mai aapki madad karna chahti hoon.': {
            'en-IN': 'Please tell me more — I want to help you.', 'hi-IN': 'कृपया थोड़ा और बताइए — मैं आपकी मदद करना चाहती हूँ।', 'kn-IN': 'ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಹೆಚ್ಚಿನ ವಿವರವನ್ನು ನೀಡಿ — ನಾನು ನಿಮ್ಮ ಸಹಾಯ ಮಾಡಬಯಸುತ್ತೇನೆ.'
        },
        'Mujhe samajh nahi aaya. Aap dobara kahenge?': {
            'en-IN': 'I did not understand. Could you say that again?', 'hi-IN': 'मुझे समझ नहीं आया। क्या आप दोबारा कहेंगे?', 'kn-IN': 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ. ನೀವು ಅದನ್ನು ಮತ್ತೆ ಹೇಳಬಹುದುವೇ?'
        },
        'Emergency: Saathi ne emergency process shuru kiya. Hum aapke location ko bhej rahe hain aur help bula rahe hain.': {
            'en-IN': 'Emergency: Saathi has started the emergency process. Sending your location and calling for help.', 'hi-IN': 'इमरजेंसी: साथी ने मदद प्रक्रिया शुरू कर दी है। हम आपकी लोकेशन भेज रहे हैं और मदद बुलाई जा रही है।', 'kn-IN': 'ತುರ್ತು: Saathi ತುರ್ತು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿದೆ. ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ ಮತ್ತು ಸಹಾಯಕ್ಕಾಗಿ ಕರೆ ಮಾಡಲಾಗುತ್ತಿದೆ.'
        }
    };

    for (const key in map) {
        if (text.includes(key.split(':')[0]) || text === key) {
            return map[key][lang] || map[key]['en-IN'];
        }
    }
    const fallback = { 'en-IN': text, 'hi-IN': text, 'kn-IN': text };
    return fallback[currentLang] || text;
}

// initialize
window.addEventListener('DOMContentLoaded', () => {
    // init();

    const micBtn = document.getElementById("micBtn");
    
    micBtn.addEventListener("click", () => {
        console.log("ORANGE");
        const isRecording = micBtn.classList.toggle("recording");
        micBtn.setAttribute("aria-pressed", isRecording);

        // remove any old waves
        const oldWave = micBtn.querySelector(".wave");
        if (oldWave) oldWave.remove();
        console.log("BANANA");
        if (isRecording) {
            console.log("APPLE");
            // add wave bars
            const wave = document.createElement("span");
            wave.className = "wave";
            wave.setAttribute("aria-hidden", "true");
            for (let i = 0; i < 4; i++) {
                wave.appendChild(document.createElement("span"));
            }
            micBtn.appendChild(wave);

            // add glow
            micBtn.style.boxShadow =
                "0 0 20px 6px rgba(243, 111, 33, 0.6), 0 6px 12px rgba(0,0,0,0.2)";
        } else {
            console.log("CHEEKU");
            // remove glow
            micBtn.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
        }
    });
});
