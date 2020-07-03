let obj = {
'返回的结果': {
    '参数1': {
        '1-1': {a:1, b:1, c: 1},
        '1-2': {a:1, b:1, c: 1}
    },
    '参数2': {
        '2-1': {a:1, b:1, c: 1},
        '2-2': {a:1, b:1, c: 1}
    },
    '参数3': {
        '3-1': {a:1, b:1, c: 1},
        '3-2': {a:1, b:1, c: 1}
    }
}
}
let arr = Object.entries(obj)
console.log(arr)
arr.forEach(v => {
    console.log(v);
})

