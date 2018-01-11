const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');

const isDirExistAndMkDir = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (isDirExistAndMkDir(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
  return false;
};

const getSuffix = (fileName) => {
  let nameList = fileName.split('.');
  return nameList[nameList.length - 1];
};

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */

const uploadFile = (ctx, options) => {
  const busboy = new Busboy({headers: ctx.headers});
  const _fileType = options.fileType || 'common';
  const _filePath = path.join(options.path, _fileType);
  const mkdirResult = isDirExistAndMkDir(_filePath);

  return new Promise((resolve, reject) => {
    let result = {
      success: false,
      message: {}
    };
    if (mkdirResult) {
      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        let _filename = Math.random().toString(16).substr(2) + '.' + getSuffix(filename);
        let _uploadFilePath = path.join(_filePath, _filename);
        let saveTo = path.join(_uploadFilePath);
        file.pipe(fs.createWriteStream(saveTo));
      });
      busboy.on('finish', () => {
        result.success = true;
        result.message = '文件上传成功！';
        resolve(result);
      });
      busboy.on('error', () => {
        result.success = false;
        result.message = '文件上传失败！';
        reject(result);
      });
      ctx.req.pipe(busboy);
    } else {
      result.success = false;
      result.message = '文件上传失败！';
      reject(result);
    }
  });
};
module.exports = { uploadFile };
