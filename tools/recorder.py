import sounddevice as sd
import wavio

def record_audio(seconds=10, filename="temp.wav", fs=44100):
    print("Recording...")
    recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    wavio.write(filename, recording, fs, sampwidth=2)
    print("Recording complete.")
    return filename
