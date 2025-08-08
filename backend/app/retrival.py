# import os
# from dotenv import load_dotenv
# from langchain_community.vectorstores import Pinecone
# from langchain_huggingface import HuggingFaceEmbeddings

# load_dotenv()

# INDEX_NAME = os.getenv("PINECONE_INDEX_NAME")

# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# def get_retriever(category: str, k: int = 5):
#     vector_store = Pinecone.from_existing_index(
#         index_name=INDEX_NAME,
#         embedding=embeddings
#     )
#     return vector_store.as_retriever(
#         search_kwargs={
#             "k": k,
#             "filter": {"category": category}
#         }
#     )