import os
import logging
from typing import List
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.schema import Document

logger = logging.getLogger(__name__)
load_dotenv()

CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR", "./chroma_db")

# Initialize embeddings and vector store
try:
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    vector_store = Chroma(
        persist_directory=CHROMA_DB_DIR,
        embedding_function=embeddings
    )
except Exception as e:
    logger.error(f"Failed to initialize vector store: {str(e)}")
    vector_store = None


def get_candidate_hooks(category: str, content: str, k: int = 5) -> List[Document]:
    """Retrieve candidate hooks based on category and content similarity."""
    if not vector_store:
        logger.error("Vector store not initialized")
        return []

    if not content.strip():
        logger.warning("Empty content provided")
        return []

    try:
        category_normalized = category.lower().strip()
        results = vector_store.similarity_search(
            query=content,
            k=k,
            filter={"category": category_normalized}
        )
        logger.info(
            f"Found {len(results)} candidate hooks for category '{category_normalized}'"
        )
        return results
    except Exception as e:
        logger.error(f"Failed to retrieve hooks: {str(e)}")
        return []


def get_all_categories() -> List[str]:
    """Get all available categories from the vector store."""
    if not vector_store:
        return []

    try:
        data = vector_store.get(include=["metadatas"])
        categories = {
            meta.get("category")
            for meta in data["metadatas"]
            if meta and "category" in meta
        }
        return sorted(list(categories))
    except Exception as e:
        logger.error(f"Failed to get categories: {str(e)}")
        return []

# import os
# import logging
# from typing import List, Optional
# from dotenv import load_dotenv
# from langchain_community.vectorstores import Chroma
# from langchain_huggingface import HuggingFaceEmbeddings
# from langchain.schema import Document

# logger = logging.getLogger(__name__)

# load_dotenv()

# CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR", "./chroma_db")

# # Initialize embeddings and vector store
# try:
#     embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
#     vector_store = Chroma(
#         persist_directory=CHROMA_DB_DIR,
#         embedding_function=embeddings
#     )
# except Exception as e:
#     logger.error(f"Failed to initialize vector store: {str(e)}")
#     vector_store = None

# def get_candidate_hooks(
#     category: str, 
#     content: str, 
#     k: int = 5
# ) -> List[Document]:
#     """
#     Retrieve candidate hooks based on category and content similarity.
    
#     Args:
#         category: The hook category to filter by
#         content: The content to find similar hooks for
#         k: Number of candidates to return
        
#     Returns:
#         List of Document objects containing hook candidates
#     """
#     if not vector_store:
#         logger.error("Vector store not initialized")
#         return []
    
#     if not content.strip():
#         logger.warning("Empty content provided")
#         return []
    
#     try:
#         category_normalized = category.lower().strip()
        
#         results = vector_store.similarity_search(
#             query=content,
#             k=k,
#             filter={"category": category_normalized}
#         )
        
#         logger.info(f"Found {len(results)} candidate hooks for category '{category_normalized}'")
#         return results
        
#     except Exception as e:
#         logger.error(f"Failed to retrieve hooks: {str(e)}")
#         return []

# def get_all_categories() -> List[str]:
#     """Get all available categories from the vector store."""
#     if not vector_store:
#         return []
    
#     try:
#         # This is a simple way - you might want to cache this
#         all_docs = vector_store.similarity_search("", k=1000)  # Get many docs
#         categories = set()
#         for doc in all_docs:
#             if "category" in doc.metadata:
#                 categories.add(doc.metadata["category"])
#         return sorted(list(categories))
#     except Exception as e:
#         logger.error(f"Failed to get categories: {str(e)}")
#         return []