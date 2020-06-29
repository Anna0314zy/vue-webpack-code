
let less = require('less');
//less编译出css

function loader(source) {   
    let css = '';
    less.render(source, function(err,r) {
        //渲染完的结果
        css = r.css;
    })
        css = css.replace(/\n/g, '\\n');
        //传给css-loader
        return css;
}
module.exports = loader;