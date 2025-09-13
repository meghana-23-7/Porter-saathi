from tools.searcher import ask_gemini
from tools.voicehelp import listen_and_translate, speak_text, respond_in_native

def get_user_language():
    print("Choose your native language code (e.g., 'hi' for Hindi, 'kn' for Kannada, 'te' for Telugu, 'ta' for Tamil, 'en' for English):")
    lang = input("Enter language code: ").strip().lower()
    if not lang:
        lang = "hi"  # default Hindi
    return lang

def format_search_result(results, style="brief"):
    if not results:
        return "No information found."

    first_result = results[0]
    text = first_result["body"]

    if style == "brief":
        return text.split(".")[0].strip()  # first sentence only
    elif style == "summary":
        return ". ".join(text.split(".")[:2]).strip()  # first 2 sentences
    else:
        return text

def main():
    # Step 0: Get user's preferred language
    target_lang = get_user_language()
    print(f"Using native language: {target_lang}")

    english_text, native_lang = listen_and_translate(native_lang=target_lang)

    if english_text.strip():  
        response_list = ask_gemini(english_text) 
    else:  
        print("No query detected from transcription.")  

    # Step 2: Real search
    response_list = ask_gemini(english_text)
    response_text = format_search_result(response_list)
    print(f"Search response (brief): {response_text}")

    respond_in_native(response_text, target_lang)

if __name__ == "__main__":
    main()
