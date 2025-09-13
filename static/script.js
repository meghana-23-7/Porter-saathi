'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const micBtn = document.getElementById("micBtn");
    const responseText = document.getElementById("responseText"); // div to show transcript + answer
    const replayBtn = document.createElement("button"); // replay button
    replayBtn.textContent = "Replay Response";
    replayBtn.style.display = "none"; // hidden until we get first response
    document.body.appendChild(replayBtn);

    let lastAudioBase64 = null; // store last audio so we can replay

    micBtn.addEventListener("click", () => {
        const isRecording = micBtn.classList.toggle("recording");
        micBtn.setAttribute("aria-pressed", isRecording);

        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    let mediaRecorder;
    let audioChunks = [];

    async function startRecording() {
        audioChunks = [];
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = e => audioChunks.push(e.data);

        mediaRecorder.onstop = async () => {
            const blob = new Blob(audioChunks, { type: 'audio/webm' });

            // Show recorded audio playback (optional for debugging)
            const audioPlayback = document.createElement('audio');
            audioPlayback.src = URL.createObjectURL(blob);
            audioPlayback.controls = true;
            document.body.appendChild(audioPlayback);

            // Send to backend
            const formData = new FormData();
            formData.append('audio', blob, 'recording.webm');

            try {
                const res = await fetch('/process_audio', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();

                responseText.innerHTML = `<b>Transcript:</b> ${data.transcript}<br><b>Answer:</b> ${data.answer}`;

                // Store audio for replay
                lastAudioBase64 = data.audio_base64;

                // Play TTS audio immediately
                playTTS(lastAudioBase64);

                // Show replay button
                replayBtn.style.display = "inline-block";
            } catch (err) {
                console.error(err);
                responseText.innerText = "Error sending audio to backend.";
            }
        };

        mediaRecorder.start();

        // Stop recording automatically after 5 seconds
        setTimeout(() => {
            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                mediaRecorder.stop();
            }
        }, 5000);
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== "inactive") {
            mediaRecorder.stop();
        }
    }

    function playTTS(base64Audio) {
        if (!base64Audio) return;
        const ttsAudio = new Audio("data:audio/mp3;base64," + base64Audio);
        ttsAudio.play()
            .then(() => console.log("Playing response audio"))
            .catch(err => console.error("Audio playback failed:", err));
    }

    // Replay button logic
    replayBtn.addEventListener("click", () => {
        if (lastAudioBase64) {
            playTTS(lastAudioBase64);
        }
    });
});
