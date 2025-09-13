from tools.recorder import record_audio
from tools.transcriber import transcribe_with_whisper
from tools.translator import translate_text
from tools.speaker import speak_text

def respond_in_native(response_en: str, native_lang: str):
    native_response = translate_text(response_en, target_lang=native_lang)
    print(f"Response in {native_lang}: {native_response}")
    if not native_response:
        native_response="No response found"
    speak_text(native_response)


def listen_and_translate(native_lang: str):
    """Records audio, transcribes, translates to English."""
    print("Recording...")
    audio_file = record_audio(5)

    print("Transcribing...")
    native_text = transcribe_with_whisper(audio_file)
    print(f"User said ({native_lang}): {native_text}")

    english_text = translate_text(native_text, target_lang="en")
    print(f"Translated to English: {english_text}")

    return english_text, native_lang

