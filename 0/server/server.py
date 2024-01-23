import os
import json
from datetime import datetime

try:
    from fastapi import FastAPI
    from fastapi.responses import FileResponse
    from fastapi.middleware.cors import CORSMiddleware
except:
    os.system("pip install fastapi")

try:
    import uvicorn
except:
    os.system("pip install uvicorn")

pypath = os.path.split(os.path.realpath(__file__))[0]  # 脚本路径
datapath = pypath + "/data/" # 数据目录
statsDict = dict()  # 内存内统计数据
uploadtimes = 0  # 减少io

# 初始化modpack列表
# f = open(file=datapath + "all-old.json", mode="r", encoding="utf-8")
f = open(file=datapath + "bz.json", mode="r", encoding="utf-8")
content = f.read()
modpacklists = json.loads(content)
f.close

# 初始化trmodpack列表
fd = open(file=datapath + "bz.json", mode="r", encoding="utf-8")
content = fd.read()
trmodpacklists = json.loads(content)
fd.close

# 加载存储的统计数据
fs = open(file=datapath + "stats.json", mode="r", encoding="utf-8")
sd = fs.read()
statsDict = json.loads(sd)
fs.close

# fastapi初始化
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# datetime.fromtimestamp(int(os.path.getctime("test")))  获取文件创建时间


@app.get("/modpacklist")  # modpack列表
def modpacklist():
    return modpacklists

@app.get("/trmodpacklist")  # trmodpack列表
def modpacklist():
    return trmodpacklists

# @app.get("/")
# def root():
#     return {"data": "接口错误"}

# @app.get("/file") # 文件传输（测试）
# def file():
#     os.stat(path="modpackfile\Chroma-sky-2-CN-1.0.9.rar")
#     return FileResponse(path="modpackfile\Chroma-sky-2-CN-1.0.9.rar",filename="Chroma-sky-2-CN-1.0.9.rar")

# @app.get("/stats/getall") # 全部下载统计数据
# def getall():
#     return {str(statsDict)}


@app.get("/stats/get")  # 下载统计数据
def get(n: str):
    output = statsDict.setdefault(n, 0)
    return output


@app.post("/stats/upload")  # 接收统计数据
def update(n: str):
    global uploadtimes
    a = statsDict.setdefault(n, 0) + 1
    statsDict[n] = a
    uploadtimes = uploadtimes + 1

    if (uploadtimes == 10):  # 减少io 每10次请求保存一次到文件中
        uploadtimes = 0
        f = open(file=datapath + "stats.json", mode="w", encoding="utf-8")
        f.write(json.dumps(statsDict))
        f.close

    return True


if __name__ == "__main__":
    uvicorn.run(app="server:app", reload=True, host="127.0.0.1", port=8000)
