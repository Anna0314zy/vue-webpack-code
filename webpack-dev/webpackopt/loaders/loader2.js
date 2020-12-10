function loader(source) {
    let callback = this.async();
    setTimeout(() => {
        console.log('loader2', this.data);
        callback(null, source + '//loader2')
        console.timeEnd('cost');
    }, 2000);
}
loader.pitch = function(remindingRequest,previousRequest,data) {
    console.log('pitch2')
    // return 'let name = "loader3"'
}
module.exports = loader;
