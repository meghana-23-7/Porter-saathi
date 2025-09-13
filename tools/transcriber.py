import whisper

# Load model once
model = whisper.load_model("base")
def transcribe_with_whisper(audio_file: str) -> str:
    print("Running local Whisper transcription...")
    result = model.transcribe(audio_file)
    return result["text"]
