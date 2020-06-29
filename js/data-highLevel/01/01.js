//随机生成100万条数据
//100万条数据打乱
//排序
//[1,2,3,4]
//随机选择一个数进行交换
function gen() {
    const arr = [];
    for(let i = 0; i < w*10000;i++) {
        arr[i] = i+1;
    }
    fisher_yates_shuffle(arr);
    return arr;
}
function fisher_yates_shuffle(arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        //[1, arr.length - 1中取一个整数]
        //生成[3,6] 之间的随机数 3 + Math.floor(Math.random() * 3);
        const j = i + Math.floor(Math.random() * (arr.length - i));
        console.log(j, 'j--')
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr;
}
//不满足大数定理 
function shuffle_simple(arr) {
    return arr.sort(() => Math.random() - .5)
}
//随机出来4 个数 然后根据随机出来的数排序  
function shuffle(arr) {
    const m = [];
    const N = arr.length * arr.length * arr.length;
    for (let i = 0; i < arr.length - 1; i++) {
        m[i] =Math.floor(Math.random(1, N))
    }
    return arr.sort((i,j) => m[i] - m[j])
}
//检验算法
let c = 0;
for(let j = 0; j < 10000; j++) {
    const a = shuffle([1,2,3,4]);
    if (a[1] === 2) {
        c++
    }
}
console.log(c / 10000);
