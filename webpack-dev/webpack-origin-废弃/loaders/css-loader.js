function loader(source) {
   let reg = /url\((.+?)\)/g;
   let pos = 0;
   let current;
   let arr = ['let list = []'];
   while(current = reg.exec(source)) { //match
    let [macthUrl, g] = current;
    console.log(reg.lastIndex, macthUrl, g) //url('./img.jpg') './img.jpg'
    let last = reg.lastIndex - macthUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos,last))})`);
    //把g 替换成require的写法 => url(require('xxxx'))
    pos = reg.lastIndex;
    arr.push(`list.push('url('+require(${g})+')')`);
   }
   console.log(JSON.stringify(source.slice(pos)), 'JSON.stringify(source.slice(pos))');
   arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
   arr.push(`module.exports = list.join('')`)
   console.log(arr, 'arr---');//  arr.join('\r\n')  把数组的各项拼接起来
   console.log(arr.join('\r\n')); //返回的结果  给style-loader
    return arr.join('\r\n');
}
// JSON.stringify(source) 转换成一行
module.exports = loader;