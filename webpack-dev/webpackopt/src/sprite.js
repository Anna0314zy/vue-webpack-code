const spritesmith = require('spritesmith');
const path = require('path');
let url = path.resolve(that.context, item.url);
// url = url.replace(/(\?sprite)/, '');
let sprites = [
    path.resolve('./a.png'),
    path.resolve('./b.png')
]
spritesmith.run({src:sprites},(err,result) => {
    console.log(err,result);
    fs.writeFileSync('./sprite.img',result.image)
})
/**coordinates: {
    '/Users/zouyu/Desktop/vue-webpack-code/webpack-dev/webpackopt/src/a.png': { x: 0, y: 0, width: 5670, height: 5670 },
    '/Users/zouyu/Desktop/vue-webpack-code/webpack-dev/webpackopt/src/b.png': { x: 5670, y: 0, width: 587, height: 466 }
},
properties: { width: 6257, height: 5670 },
 image: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 18 71 00 00 16 26 08 06 00 00 00 e3 ce f8 e5 00 00 80 00 49 44 41 54 78 01 ec c1 09 bc 5d 07 41 ... 1216202 more bytes>

 **/


