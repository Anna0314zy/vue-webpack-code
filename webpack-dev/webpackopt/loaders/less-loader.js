
let less = require('less');
//less编译出css
console.log('less-loader');

function loader(source) {
    let callback = this.async();
    less.render(source, {filename:this.resource},function(err,output) {
        //渲染完的结果
        console.log(output.css)
       callback(err, output.css)
    })
}
module.exports = loader;
