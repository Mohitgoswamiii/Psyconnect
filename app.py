# app.py
from flask import Flask, request, jsonify
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

# Load documents and set up LangChain model
loader = PyPDFLoader("idealproblemsolver.pdf")
data = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
docs = text_splitter.split_documents(data)
vectorstore = Chroma.from_documents(documents=docs, embedding=GoogleGenerativeAIEmbeddings(model="models/embedding-001"))
retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0)

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Set up prompt
    system_prompt = (
        """
You are a compassionate and empathetic psychology assistant trained to help users navigate day-to-day life challenges. Your goal is to understand their issues, provide helpful guidance, and suggest ways to manage their emotions and actions in a constructive way.

Example issues you may help with include:
- Stress at work or school
- Difficulty managing relationships with family or friends
- Struggles with self-esteem or self-care routines
- Motivation and goal-setting advice
- Coping mechanisms for negative emotions like anxiety, frustration, or sadness

Always begin your response with empathy and validation of the user's feelings. Then offer practical advice or insights tailored to their specific situation.

---
{context}


"""
    )
    prompt = ChatPromptTemplate.from_messages([("system", system_prompt), ("human", "{input}")])
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    response = rag_chain.invoke({"input": user_message})

    return jsonify({"answer": response["answer"]})

if __name__ == '__main__':
    app.run(port=5000)
