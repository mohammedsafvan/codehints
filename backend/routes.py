import os
from openai import OpenAI
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai import Agent
import requests
from prompt import system_prompt, voice_system_prompt
from models import PromptData, ResultData, VoiceInput
from dotenv import load_dotenv
from io import BytesIO

load_dotenv()
router = APIRouter()
gemini_api_key = os.getenv("GEMINI_API_KEY")
opeai_api_key = os.getenv("OPENAI_API_KEY")
deepgram_api_Key = os.getenv("DEEPGRAM_API_KEY")
if not gemini_api_key or not opeai_api_key or not deepgram_api_Key:
    print("No api key provided")


model = GeminiModel("gemini-1.5-flash", api_key=gemini_api_key)
agent = Agent(model, system_prompt=system_prompt)
voice_agent = Agent(model, system_prompt=voice_system_prompt)
openai_client = OpenAI(api_key=opeai_api_key)


async def stream_audio(filepath: str):
    try:
        file = open(filepath, "rb")

        def iterfile():
            while chunk := file.read(1024):
                yield chunk
            file.close()

        return StreamingResponse(
            iterfile(),
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": f'inline; filename="{filepath.split("/")[-1]}"'
            },
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail="File Not found")


@router.post("/")
def ping():
    return {"itis": "Working..."}


@router.post("/audio")
async def answer_voice(prompt_data: VoiceInput):
    prompt = f"""
## Problem
{prompt_data.user_question}
## User code
{prompt_data.user_code}
## User Doubt
{prompt_data.voice_question}
    """
    result = await agent.run(prompt)
    try:
        payload = {"text": result.data}

        headers = {
            "Authorization": f"Token {deepgram_api_Key}",
            "Content-Type": "application/json",
        }

        audio_file_path = "output.mp3"  # Path to save the audio file

        with open(audio_file_path, "wb") as file_stream:
            response = requests.post(
                "https://api.deepgram.com/v1/speak?model=aura-asteria-en",
                headers=headers,
                json=payload,
                stream=True,
            )
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    file_stream.write(
                        chunk
                    )  # Write each chunk of audio data to the file

        print("Audio download complete")
        # response = openai_client.audio.speech.create(
        #     model="tts-1", voice="alloy", input=result.data
        # )
        # response.stream_to_file("output.mp3")
        file = open("output.mp3", "rb")

        def iterfile():
            while chunk := file.read(1024):
                yield chunk
            file.close()

        return StreamingResponse(
            iterfile(),
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": f'inline; filename="{"output.mp3".split("/")[-1]}"'
            },
        )
        # Stream audio dat
        # audio_data = response["audio"]
        # audio_stream = BytesIO(audio_data)

        # Return a streaming response
        # return StreamingResponse(
        #     audio_stream,
        #     media_type="audio/wav",
        #     headers={"Content-Disposition": "inline; filename=output.wav"},
        # )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate")
async def generate_hints(prompt_data: PromptData):
    prompt = f"""
## USER QUESTION
{prompt_data.user_question}


## USER CODE
{prompt_data.user_code}
"""
    result = await agent.run(prompt)
    return ResultData(hints=result.data)
