import json
import os
from dotenv import load_dotenv
import pinecone
from langchain.vectorstores import Pinecone
from langchain.embeddings import HuggingFaceEmbeddings

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = "hooks-ai"

# init pinecone
pinecone.init(api_key=PINECONE_API_KEY)

# use a 1024-d embedding model
embeddings_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# load JSON
with open("hooks.json", "r", encoding="utf-8") as f:
    data = json.load(f)

docs, metadatas = [], []

for category, hooks in data.items():
    for idx, hook in enumerate(hooks):
        words = hook.split()
        chunks = [' '.join(words[i:i+50]) for i in range(0, len(words), 50)] if len(words) > 50 else [hook]
        for chunk_idx, chunk in enumerate(chunks):
            docs.append(chunk)
            metadatas.append({
                "id": f"{category}_{idx}_{chunk_idx}",
                "category": category
            })

# push to pinecone
Pinecone.from_texts(
    texts=docs,
    embedding=embeddings_model,
    metadatas=metadatas,
    index_name=INDEX_NAME
)

print("[INFO] Upload complete!")
