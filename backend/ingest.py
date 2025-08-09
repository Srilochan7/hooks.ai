import os
import json
import logging
from pathlib import Path
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def ingest_hooks():
    load_dotenv()
    
    CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR", "./chroma_db")
    HOOKS_FILE = "data/hooks.json"
    
    # Validate file exists
    if not Path(HOOKS_FILE).exists():
        raise FileNotFoundError(f"Hooks file not found: {HOOKS_FILE}")
    
    try:
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        with open(HOOKS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        docs, metadatas = [], []
        
        for category, hooks in data.items():
            if not isinstance(hooks, list):
                logger.warning(f"Skipping category '{category}': not a list")
                continue
                
            for idx, hook in enumerate(hooks):
                if not isinstance(hook, str) or not hook.strip():
                    logger.warning(f"Skipping empty hook in category '{category}'")
                    continue
                    
                docs.append(hook.strip())
                metadatas.append({
                    "id": f"{category}_{idx}",
                    "category": category.lower()  # Normalize to lowercase
                })
        
        if not docs:
            raise ValueError("No valid hooks found to ingest")
        
        # Create directory if it doesn't exist
        Path(CHROMA_DB_DIR).mkdir(parents=True, exist_ok=True)
        
        Chroma.from_texts(
            texts=docs,
            embedding=embeddings,
            metadatas=metadatas,
            persist_directory=CHROMA_DB_DIR
        )
        
        logger.info(f"Successfully stored {len(docs)} hooks in Chroma at {CHROMA_DB_DIR}")
        
    except Exception as e:
        logger.error(f"Failed to ingest hooks: {str(e)}")
        raise

if __name__ == "__main__":
    ingest_hooks()