import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from retriever import get_candidate_hooks

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing in .env")

llm = ChatGroq(
    model="llama3-8b-8192",
    temperature=0.3,  # Lower temp for more deterministic choice
    groq_api_key=GROQ_API_KEY
)

app = FastAPI(title="Hook Selection API with LLM")

class InputPayload(BaseModel):
    category: str
    content: str

@app.post("/choose_best_hook")
async def choose_best_hook(payload: InputPayload):
    try:
        # Step 1: Retrieve candidate hooks
        candidates = get_candidate_hooks(payload.category, payload.content, k=5)
        if not candidates:
            return {"message": "No hooks found for this category"}

        candidate_texts = "\n".join(
            [f"{i+1}. {doc.page_content}" for i, doc in enumerate(candidates)]
        )

        # Step 2: Ask LLM to choose the best one
        prompt = f"""
You are an expert social media strategist.

Here are {len(candidates)} candidate hooks from the "{payload.category}" category:
{candidate_texts}

The user’s content is:
"{payload.content}"

TASK:
- Pick the single hook that best matches the tone, style, and relevance to the content.
- If needed, you may slightly adapt the hook to better fit the content.
- Return ONLY the final chosen hook, nothing else.
"""

        response = llm.invoke(prompt)

        return {
            "chosen_hook": response.content.strip(),
            "candidates_considered": [doc.page_content for doc in candidates]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))