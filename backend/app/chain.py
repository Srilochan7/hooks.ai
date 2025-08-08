from langchain.chains import RetrievalQA
from langchain_groq import ChatGroq  # Groq's LangChain wrapper

# LLM for hook generation - using Mistral on Groq
llm = ChatGroq(
    model="mistral-7b-instruct",  # You can also try "llama3-8b-8192" for LLaMA
    temperature=0.7,
    groq_api_key="YOUR_GROQ_API_KEY"
)

# Combine retrieval + LLM
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,         # your Pinecone or FAISS retriever
    chain_type="stuff",          # simple: stuffs docs into one prompt
    return_source_documents=True
)

# Example query
query = "Generate 3 new hooks for a social media video about morning motivation."
result = qa_chain({"query": query})

print("\nGenerated Hooks:\n", result["result"])
print("\nContext Used:\n", [doc.page_content for doc in result["source_documents"]])
