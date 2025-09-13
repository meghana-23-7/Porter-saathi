from openai import OpenAI

def ask_gpt(user_prompt: str, system_prompt: str) -> str:
    print("User promt: ", user_prompt)
    print("System prompt: ", system_prompt)
    client = OpenAI(
        api_key="key",  
        base_url="https://openrouter.ai/api/v1"
    )

    response = client.chat.completions.create(
        model="google/gemini-flash-1.5",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
    )
    try:
        return response.choices[0].message.content.strip()
    except Exception as e:
        print("Error:", e)
        return "Sorry, I couldn't process your request at the moment."
