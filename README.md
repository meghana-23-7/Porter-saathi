# Porter Saathi

## Project Overview

Porter Saathi is an AI voice-first companion designed to empower our driver-partners by eliminating literacy barriers. It transforms complex, text-based information into simple, actionable conversations in their regional language.

The name _"Saathi"_ translates to _"companion,"_ and that's exactly what this app is: a trusted, intuitive partner that helps driver-partners manage their business, learn new skills, and navigate challenges safely.

## Problem Statement
In the modern gig economy, driver-partners often face a significant literacy gap. The reliance on text interfaces is a major source of frustration and inefficiency. This barrier prevents them from accessing critical resources and opportunities, limiting their earning potential and independence.

## Solution: A Voice-First AI Partner
Porter Saathi leverages advanced NLP to create a seamless, voice-first experience. Users simply speak their questions and needs, and the AI translates complex data and text into a clear, conversational response. It's like having a personal assistant in your pocket.

## Key Features

### Unordered

* **_Simplified Business Management:_** Drivers can use their voice to ask about their earnings, track their daily performance, and get real-time financial updates, making money management effortless.

* **_Accessible "Guru":_** The app includes a library of life skills and troubleshooting guides. Drivers can ask for tutorials on topics like vehicle maintenance, legal advice, or personal finance, receiving voice-guided instructions.

* **_Intuitive Safety:_** For emergency situations, the app offers hands-free assistance and a Sahayata (help) button activated by a simple voice command, ensuring safety on the road without distraction.

* **_Voice-Led Onboarding:_** New drivers can complete the entire onboarding process using voice commands, eliminating the need to read and fill out complicated forms.

* **_Multilingual Support:_** The AI is trained on various regional languages, ensuring that it can effectively communicate with a diverse range of driver-partners.

## Technical Details
The app's architecture is a multi-step process that transforms voice into meaningful action. It begins with the user's voice input on the User Device/UI, which is sent to a Speech-to-Text API (e.g., Whisper API) to be transcribed into text.

This text is then passed to the core of the system, a powerful language model (such as Gemini). Here, the user's intent is analyzed in combination with system prompts and relevant data (from mocked JSON sources) to generate a precise textual response.

This response is then processed by a Response Generation & Business Logic Layer. Finally, the text is fed into a Text-to-Speech API (e.g., pyTTSx3), which synthesizes the final audio output. This audio is played back to the user, often complemented by visual cards on the device's screen for a complete and intuitive user experience.

* Architecture diagram:
<img width="934" height="409" alt="Screenshot 2025-09-13 171650" src="https://github.com/user-attachments/assets/4054adb1-b289-4a41-9ba2-8f4230aed73b" />

## Impact
Porter Saathi is not just a tool—it's a path to genuine empowerment. By making critical information accessible to everyone, it helps our driver-partners build confidence, grow their business, and achieve true independence. This is a companion for the journey ahead.

Instructions to run porter saathi:
- Set up Python vurtual enviroment
- Install requirements
- Run app.py with Python
