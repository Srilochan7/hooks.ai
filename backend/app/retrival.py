from langchain_community.vectorstores import Pinecone 
from langchain_community.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name = "all-MiniLM-L6-v2"
)

vector_store = Pinecone.from_existing_index(
    index_name="hooks-ai",
    embedding=embeddings
)

retriever = vector_store.as_retriever(
    search_kwargs = {
        "k":5,
        "filter":{"category":"general"}
    }
)