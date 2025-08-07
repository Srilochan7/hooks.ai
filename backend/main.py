from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class InputPayload(BaseModel):
    context: str
    audience: str
    tone: str
    intent: str
    theme:str
        
        
app.post('/generate')
async def generate_content(data: InputPayload):
    return {
        "message" : "recieved input successfully",
        "data" : {
            "context":data.context,
            "audience":data.audience,
            "tone":data.tone,
            "intent": data.intent,
            "theme":data.theme
        }
    }
    


