// UploadPlugin.js/
let path = require('path');
//把外链的标签变成内链的
class UploadPlugin {
    constructor(options) {
        let {
            bucket = '',
            domain = "",
            accesskey = '',
            secretKey = ""
        } = options;
        let mac = new qiniu.auth.digest.Mac(accesskey, secretKey);
        let putPolicy = new qiniu.rs.putPolicy({scope: bucket});
        this.uploadToken = putPolicy.uploadToken(mac);
        let config = new qiniu.conf.Config();
        this.formUploader = new qiniu.form_up.FormUploader(config);
        this.putExtra = new qiniu.form_up.PutExtra();
    }
    upload(filename) {
        return new Promise((reslove, reject) => {
            let localFile = path.reslove(__dirname, '../dist', filename);
            this.formUploader.putFile(this.uploadToken, filename, localFile, putExtra, function(respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                if (respInfo.statusCode == 200) {
                    reslove(respBody)
                }
            })
        })
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compilation) => {
            let assets =  compilation.assets;
            let promise = [];
            Object.keys(assets).forEach(filename => {
                promise.push(this.upload(filename));
            })
            return Promise.all(promise)
        })

    }
}
module.exports = UploadPlugin;