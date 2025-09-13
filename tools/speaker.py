import pyttsx3
import time

try:
    engine = pyttsx3.init(driverName="sapi5")
except Exception:
    engine = pyttsx3.init()

voices = engine.getProperty("voices")
if voices:
    engine.setProperty("voice", voices[1].id if len(voices) > 1 else voices[0].id)

engine.setProperty("rate", 160)  
engine.setProperty("volume", 1.0) 

def speak_text(text: str):
    """Convert text to speech and ensure playback finishes before exit."""
    if not text or not text.strip():
        return
    try:
        print(f"Speaking: {text}")
        engine.say(text)
        engine.runAndWait()
        time.sleep(0.5)
    except Exception as e:
        print(f"Speech synthesis failed: {e}")
