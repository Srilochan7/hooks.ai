import os
import json
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()

CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR", "./chroma_db")

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

with open("data/hooks.json", "r", encoding="utf-8") as f:
    data = json.load(f)

docs, metadatas = [], []

for category, hooks in data.items():
    for idx, hook in enumerate(hooks):
        docs.append(hook)
        metadatas.append({
            "id": f"{category}_{idx}",
            "category": category
        })

Chroma.from_texts(
    texts=docs,
    embedding=embeddings,
    metadatas=metadatas,
    persist_directory=CHROMA_DB_DIR
)

print(f"[INFO] Hooks stored in Chroma at {CHROMA_DB_DIR}")