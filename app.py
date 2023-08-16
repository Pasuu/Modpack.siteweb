from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# 获取下载量
def get_download_count(file_path):
    count_file = os.path.join(os.path.dirname(file_path), 'download_count.txt')
    if os.path.exists(count_file):
        with open(count_file, 'r') as f:
            return int(f.read())
    return 0

# 增加下载量
def increment_download_count(file_path):
    count_file = os.path.join(os.path.dirname(file_path), 'download_count.txt')
    if os.path.exists(count_file):
        with open(count_file, 'r+') as f:
            count = int(f.read()) + 1
            f.seek(0)
            f.write(str(count))
            f.truncate()

# 处理文件下载请求
@app.route('/pro/<path:filename>')
def download_file(filename):
    file_path = os.path.join('pro', filename)
    if os.path.exists(file_path):
        increment_download_count(file_path)
        return send_from_directory('pro', filename)
    else:
        return 'File not found', 404

# 获取下载量的路由
@app.route('/get_download_count/<path:filename>')
def get_download_count_route(filename):
    file_path = os.path.join('pro', filename)
    return str(get_download_count(file_path))

if __name__ == '__main__':
    app.run()
