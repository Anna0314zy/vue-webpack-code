'fontSize'.replace(/([A-Z])/g, function(){return '-' + arguments[1]});

//fontSize => font-size
function transform(str) {
    const reg = /([A-Z])/g;
   return str.replace(reg, function() {
        return '-' + String(arguments[1]).toLocaleLowerCase();
    })
}
console.log(transform('fontSizeSoioP'))
function transformHump(str) {
    // const reg = /([-])/g;
    // let last = reg.lastIndex;
    // console.log(last);
    // if (reg.exec(str)) {
    //     return str = str.slice
    // }
}
console.log(transformHump('font-size'))
