// UploadPlugin.js/
let path = require('path');
const qiniu = require('qiniu');
const fs = require('fs');
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
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compilation) => {
            let assets =  compilation.assets;
            let promise = Object.entries(assets).map(([key, value]) =>  this.upload(key, value.source()));
            return Promise.all(promise);
        })

    }
    upload(key, value) {
        return new Promise((reslove, reject) => {
            this.formUploader.put(this.uploadToken, key, value, this.putExtra, function(err, body, info) {
              err ? reject(err) : reslove(body);
            })
        })
    }
}
module.exports = UploadPlugin;
