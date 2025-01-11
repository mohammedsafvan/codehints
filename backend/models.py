from pydantic import BaseModel


class PromptData(BaseModel):
    user_code: str
    user_question: str


class ResultData(BaseModel):
    hints: str
