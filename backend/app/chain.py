# from langchain.chains import RetrievalQA
# from langchain_groq import ChatGroq  # Groq's LangChain wrapper

# llm = ChatGroq(
#     model="mistral-7b-instruct",
#     temperature=0.7,
#     groq_api_key="YOUR_GROQ_API_KEY"
# )

# qa_chain = RetrievalQA.from_chain_type(
#     llm=llm,
#     retriever=retriever,  # retriever must be defined outside this snippet
#     chain_type="stuff",
#     return_source_documents=True
# )

# query = "Generate 3 new hooks for a social media video about morning motivation."
# result = qa_chain({"query": query})

# # print("\nGenerated Hooks:\n", result["result"])
# print("\nContext Used:\n", [doc.page_content for doc in result["source_documents"]])
