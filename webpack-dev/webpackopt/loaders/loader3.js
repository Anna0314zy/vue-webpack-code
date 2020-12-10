function loader(source) {
    console.log('loader3');
    return source + '//loader3'
}
loader.pitch = function(remindingRequest,previousRequest,data) {
    console.log('pitch3')

}
loader.raw = true;//默认情况下 loader得到的是字符串
module.exports = loader;
