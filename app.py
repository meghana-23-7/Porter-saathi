import tempfile
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
from gtts import gTTS
from flask import render_template
from tools.searcher import ask_gpt
from sys_prompt import system_prompt
import json
import dateparser

# --------------------------
# Setup
# --------------------------
app = Flask(__name__)
CORS(app)


# Load data
with open("data/users.json") as f:
    USERS = {u["user_id"]: u for u in json.load(f)}

with open("data/deliveries.json") as f:
    DELIVERIES = json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

def parse_date_from_text(text: str, user_id: str) -> str:
    """Parse date expression from user text, return YYYY-MM-DD if available"""
    parsed = dateparser.parse(text, languages=["en", "hi", "te", "kn"])
    if not parsed:
        return max(DELIVERIES[user_id].keys())  # fallback latest
    # Normalize to delivery dataset
    date_str = parsed.strftime("%Y-%m-%d")
    available_dates = DELIVERIES[user_id].keys()
    if date_str in available_dates:
        return date_str
    # If parsed date not in data → fallback
    return max(available_dates)

def get_user_earnings(user_id, date):
    if user_id not in DELIVERIES or date not in DELIVERIES[user_id]:
        return "Data not found."

    data = DELIVERIES[user_id][date]
    gross = data["gross_earnings"]
    expenses = data["expenses"]
    penalties = sum(p["amount"] for p in data["penalties"])
    rewards = sum(r["amount"] for r in data["rewards"])
    net = gross - expenses - penalties + rewards

    return f"Trips: {data['trips']}, Gross ₹{gross}, Expenses ₹{expenses}, Penalties ₹{penalties}, Rewards ₹{rewards}, Net ₹{net}"

# Load Whisper
whisper_model = whisper.load_model("base")

# --------------------------
# Single API route
# --------------------------
@app.route("/process_audio", methods=["POST"])
def process_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio uploaded"}), 400

    audio_file = request.files["audio"]

    # Save temp audio
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        audio_file.save(tmp.name)
        tmp_path = tmp.name

    # 1. Transcribe
    result = whisper_model.transcribe(tmp_path)
    transcript = result.get("text", "").strip()
    print("transcript:", transcript)
    if not transcript:
        return jsonify({"error": "Could not transcribe"}), 500

     # Auto-detect date from query
    date = parse_date_from_text(transcript, "U001")  # Hardcoded user for demo
    context = get_user_earnings("U001", date)
    # gemini_response = gemini_model.generate_content(prompt)
    # answer_text = ask_gemini(transcript)
    response = ask_gpt(f"User query: \nDate: {context}", system_prompt)
    # answer_text = response.choices[0].message.content.strip() if response.choices else None

    print("answer ", response)

    # 3. Convert to speech (TTS)
    tts = gTTS(response)   # set lang dynamically if needed
    audio_out = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(audio_out.name)

    # Encode audio as base64
    with open(audio_out.name, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")

    # 4. Return everything in one response
    return jsonify({
        "transcript": transcript,
        "answer": response,
        "audio_base64": audio_b64
    })
# --------------------------
# Run
# --------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
