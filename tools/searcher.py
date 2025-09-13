from openai import OpenAI
def ask_gemini(prompt: str):
    client = OpenAI(
        api_key="key", 
        base_url="https://openrouter.ai/api/v1" 
    )

    response = client.chat.completions.create(
        model="google/gemini-flash-1.5", 
        messages=[
            {"role": "system", "content": "You are Porter Saathi, an empathetic voice-first assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    print(response)
    print(response.choices[0].message.content)
