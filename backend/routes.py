import os
from fastapi import APIRouter
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai import Agent
from prompt import system_prompt
from models import PromptData, ResultData
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("No api key provided")

model = GeminiModel("gemini-1.5-flash", api_key=api_key)
agent = Agent(model, system_prompt=system_prompt)


@router.get("/")
def ping():
    return {"itis": "Working..."}


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
