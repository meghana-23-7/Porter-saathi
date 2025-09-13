from deep_translator import GoogleTranslator

def translate_text(text: str, target_lang: str = "en") -> str:
    """
    Translate text using free Google Translate (via deep-translator).
    target_lang = 'en' for English, 'hi' for Hindi, etc.
    """
    try:
        translated = GoogleTranslator(source="auto", target=target_lang).translate(text)
        return translated
    except Exception as e:
        print(f"Translation failed: {e}")
        return text
