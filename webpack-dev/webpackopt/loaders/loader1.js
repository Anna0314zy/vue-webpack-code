function loader(source) {
    console.log('loader1', this.data);

    return source + '//loader1'
}
loader.pitch = function(remindingRequest,previousRequest,data) {
    data.picth='picthzy';
    console.log('pitch1');
}
module.exports = loader;
