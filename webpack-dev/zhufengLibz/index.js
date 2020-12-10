if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/zhufengmath.min.js');
}else {
    module.exports = require('./dist/zhufengmath.js')
}

