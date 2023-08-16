const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const filePath = req.query.filePath; // 获取文件路径参数，如 '/pro/Chroma-sky-2/Chroma-sky-2-CN-1.0.9.rar'
    const fileName = path.basename(filePath);
    const downloadCountFilePath = path.join(process.cwd(), 'api', 'download_counts', fileName);

    try {
        // 递增下载量
        if (fs.existsSync(downloadCountFilePath)) {
            let downloadCount = parseInt(fs.readFileSync(downloadCountFilePath, 'utf8'));
            downloadCount += 1;
            fs.writeFileSync(downloadCountFilePath, downloadCount.toString());
        }

        // 返回文件
        const fileReadStream = fs.createReadStream(path.join(process.cwd(), 'static', filePath));
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        fileReadStream.pipe(res);
    } catch (error) {
        res.status(404).send('File not found');
    }
};
