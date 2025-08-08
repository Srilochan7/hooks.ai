# import json
# import os
# from dotenv import load_dotenv
# from pinecone import Pinecone, ServerlessSpec
# from langchain_community.vectorstores import Pinecone as LangChainPinecone
# from langchain_huggingface import HuggingFaceEmbeddings

# load_dotenv()

# PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# INDEX_NAME = "hooks-ai"

# pc = Pinecone(api_key=PINECONE_API_KEY)

# if INDEX_NAME not in pc.list_indexes().names():
#     pc.create_index(
#         name=INDEX_NAME,
#         dimension=384,
#         metric="cosine",
#         spec=ServerlessSpec(cloud="aws", region="us-east-1")
#     )

# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# with open("hooks.json", "r", encoding="utf-8") as f:
#     data = json.load(f)

# docs, metadatas = [], []

# for category, hooks in data.items():
#     for idx, hook in enumerate(hooks):
#         words = hook.split()
#         chunks = [' '.join(words[i:i+50]) for i in range(0, len(words), 50)] if len(words) > 50 else [hook]
#         for chunk_idx, chunk in enumerate(chunks):
#             docs.append(chunk)
#             metadatas.append({
#                 "id": f"{category}_{idx}_{chunk_idx}",
#                 "category": category
#             })

# LangChainPinecone.from_texts(
#     texts=docs,
#     embedding=embeddings,
#     metadatas=metadatas,
#     index_name=INDEX_NAME
# )

# print("[INFO] Upload to Pinecone complete!")
