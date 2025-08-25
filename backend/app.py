import os
import logging
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from fastapi.middleware.cors import CORSMiddleware
from retriever import get_candidate_hooks, get_all_categories

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is missing in .env")

llm = ChatGroq(
    model="llama3-8b-8192", temperature=0.3, groq_api_key=GROQ_API_KEY
)

app = FastAPI(
    title="Hook Selection API with LLM",
    description="AI-powered hook generation using RAG",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "https://hooks-ai.vercel.app/",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class InputPayload(BaseModel):
    category: str = Field(..., min_length=1, description="Hook category")
    content: str = Field(..., min_length=10, description="Content to generate hook for")


class HookResponse(BaseModel):
    chosen_hook: str
    category: str
    candidates_found: int


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Hook Generator API"}


@app.get("/categories", response_model=List[str])
async def get_categories():
    try:
        return get_all_categories()
    except Exception as e:
        logger.error(f"Failed to get categories: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrieve categories",
        )


@app.post("/choose_best_hook", response_model=HookResponse)
async def choose_best_hook(payload: InputPayload):
    try:
        candidates = get_candidate_hooks(payload.category, payload.content, k=5)

        if not candidates:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No hooks found for category '{payload.category}'",
            )

        candidate_texts = "\n".join(
            [f"{i+1}. {doc.page_content}" for i, doc in enumerate(candidates)]
        )

        prompt = f"""You are an expert social media strategist.

CANDIDATE HOOKS ({len(candidates)} options from "{payload.category}" category):
{candidate_texts}

USER'S CONTENT:
"{payload.content}"

INSTRUCTIONS:
- Pick ONE hook that best matches the content
- Keep it under 100 characters if possible
- Return ONLY the final hook, no extra text

CHOSEN HOOK:"""

        response = llm.invoke(prompt)
        chosen_hook = getattr(response, "content", "").strip()

        if not chosen_hook:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="LLM returned empty response",
            )

        if chosen_hook.startswith('"') and chosen_hook.endswith('"'):
            chosen_hook = chosen_hook[1:-1]

        return HookResponse(
            chosen_hook=chosen_hook,
            category=payload.category,
            candidates_found=len(candidates),
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unexpected error while generating hook",
        )

# import os
# import logging
# from typing import List, Optional
# from fastapi import FastAPI, HTTPException, status
# from pydantic import BaseModel, Field
# from dotenv import load_dotenv
# from langchain_groq import ChatGroq
# from fastapi.middleware.cors import CORSMiddleware
# from retriever import get_candidate_hooks, get_all_categories

# # Set up logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# load_dotenv()

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# if not GROQ_API_KEY:
#     raise ValueError("GROQ_API_KEY is missing in .env")

# # Initialize LLM
# llm = ChatGroq(
#     model="llama3-8b-8192",
#     temperature=0.3,
#     groq_api_key=GROQ_API_KEY
# )

# app = FastAPI(
#     title="Hook Selection API with LLM",
#     description="AI-powered hook generation using RAG",
#     version="1.0.0"
# )

# # CORS configuration
# origins = [
#     "http://localhost:5173",
#     "http://localhost:3000",  # Add React default port
#     "http://127.0.0.1:5173",
#     "https://hooks-ai.vercel.app/"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class InputPayload(BaseModel):
#     category: str = Field(..., min_length=1, description="Hook category")
#     content: str = Field(..., min_length=10, description="Content to generate hook for")

# class HookResponse(BaseModel):
#     chosen_hook: str
#     category: str
#     candidates_found: int

# class ErrorResponse(BaseModel):
#     detail: str
#     error_code: Optional[str] = None

# @app.get("/health")
# async def health_check():
#     """Health check endpoint"""
#     return {"status": "healthy", "service": "Hook Generator API"}

# @app.get("/categories", response_model=List[str])
# async def get_categories():
#     """Get all available hook categories"""
#     try:
#         categories = get_all_categories()
#         return categories
#     except Exception as e:
#         logger.error(f"Failed to get categories: {str(e)}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Failed to retrieve categories"
#         )

# @app.post("/choose_best_hook", response_model=HookResponse)
# async def choose_best_hook(payload: InputPayload):
#     """Generate the best hook for given content and category"""
#     try:
#         logger.info(f"Generating hook for category: {payload.category}")
        
#         candidates = get_candidate_hooks(
#             payload.category, 
#             payload.content, 
#             k=5
#         )
        
#         if not candidates:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail=f"No hooks found for category '{payload.category}'"
#             )

#         candidate_texts = "\n".join([
#             f"{i+1}. {doc.page_content}" 
#             for i, doc in enumerate(candidates)
#         ])

#         prompt = f"""You are an expert social media strategist and copywriter.

# CANDIDATE HOOKS ({len(candidates)} options from "{payload.category}" category):
# {candidate_texts}

# USER'S CONTENT:
# "{payload.content}"

# INSTRUCTIONS:
# 1. Analyze the user's content for tone, style, and key themes
# 2. Select the ONE hook that best matches the content's essence
# 3. If needed, make minor adaptations to improve relevance (keep it concise)
# 4. Return ONLY the final chosen hook - no explanations or extra text
# 5. The hook should be punchy, engaging, and under 100 characters when possible
# 6. Do NOT include '{{}}'—just add the niche of the user..
# Just return the hook thats it, no more extra characters

# CHOSEN HOOK:"""

#         response = llm.invoke(prompt)
#         chosen_hook = response.content.strip()
        
#         # Clean up any unwanted prefixes or quotes
#         if chosen_hook.startswith('"') and chosen_hook.endswith('"'):
#             chosen_hook = chosen_hook[1:-1]
        
#         logger.info(f"Successfully generated hook: {chosen_hook[:50]}...")
        
#         return HookResponse(
#             chosen_hook=chosen_hook,
#             category=payload.category,
#             candidates_found=len(candidates)
#         )

#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.error(f"Unexpected error: {str(e)}")
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="An unexpected error occurred while generating the hook"
#         )

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)