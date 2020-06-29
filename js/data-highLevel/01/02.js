//插入排序  每次循环结束后  存在一个已经排序的列表和一个未排序的列表 j指向下一个未排序的数字
function insertion_sort(A) {
    for(let j = 1; j < A.length; j++) {
        const key = A[j];
        let i = j - 1;
        while(i >=0 && A[i] > key) {
            A[i+1] = A[i]
            i--
        }
        A[i+1] = key;
    }
    return A;
}
console.log(insertion_sort([0,9,88,1,-11]))