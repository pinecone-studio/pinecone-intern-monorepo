from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import ollama
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's origin if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

class ChatRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

async def generate_stream(prompt: str):
    try:
        response = ollama.chat(model="llama3", messages=[{"role": "user", "content": prompt}], stream=True)
        for chunk in response:
            if "message" in chunk:
                yield chunk["message"]["content"] + " "  # Ensure correct chunking
                await asyncio.sleep(0)  # Allow async execution
    except Exception as e:
        yield f"Error: {str(e)}"

@app.post("/generate")
async def generate(request: ChatRequest):
    return StreamingResponse(generate_stream(request.prompt), media_type="text/plain")