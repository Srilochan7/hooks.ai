# import os
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from dotenv import load_dotenv
# from langchain.chains import RetrievalQA
# from langchain_groq import ChatGroq
# from retriever import get_retriever

# load_dotenv()

# GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# llm = ChatGroq(
#     model="llama3-8b-8192",
#     temperature=0.7,
#     groq_api_key=GROQ_API_KEY
# )

# app = FastAPI(title="Hook Generation API")

# class InputPayload(BaseModel):
#     category: str
#     content: str

# @app.post("/generate")
# async def generate_hooks(payload: InputPayload):
#     try:
#         retriever = get_retriever(payload.category)

#         prompt_template = """
# You are an expert social media copywriter.

# You are given a set of hook templates retrieved from a database.  
# These templates are short, engaging, and belong to the category: {category}.  
# They are examples of how to start a social media video or post to grab attention.

# TASK:
# 1. Study the retrieved hook templates and identify their tone, style, and structure.
# 2. Based on the user’s script content: "{content}", generate 3 brand-new hooks.
# 3. The hooks must:
#    - Match the style and tone of the given category.
#    - Be short, punchy, and attention-grabbing (max 1 sentence each).
#    - Be relevant to the provided script content.
# 4. Do NOT copy the templates exactly — create fresh variations.
# 5. Output ONLY the 3 hooks, each on a new line, without extra commentary.

# Retrieved Hook Templates:
# {context}
# """

#         qa_chain = RetrievalQA.from_chain_type(
#             llm=llm,
#             retriever=retriever,
#             chain_type="stuff",
#             return_source_documents=True
#         )

#         query = prompt_template.format(
#             category=payload.category,
#             content=payload.content,
#             context="{context}"  # LangChain will replace with retrieved docs
#         )

#         result = qa_chain.invoke({"query": query})

#         return {
#             "generated_hooks": result["result"].strip().split("\n"),
#             "source_documents": [doc.page_content for doc in result["source_documents"]]
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))