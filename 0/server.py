import os
try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
except:
    os.system("pip install fastapi")
try:
    import uvicorn
except:
    os.system("pip install uvicorn")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

statsDict = dict()

@app.get("/")
def root():
    return {"data": "接口错误"}

@app.get("/stats/getall")
def say():
    return {str(statsDict)}

@app.get("/stats/get")
def say(n: str):
    output = statsDict.setdefault(n, 0)
    return output

@app.post("/stats/upload")
def update_item(n: str):
    a = statsDict.setdefault(n, 0) + 1
    statsDict[n]= a
    return True

if __name__ == '__main__':
    uvicorn.run(app="server:app", reload=False, host="127.0.0.1", port=8000)