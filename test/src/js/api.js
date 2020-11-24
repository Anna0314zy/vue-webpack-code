export function getList() {
    return new Promise((reslove) => {
        setTimeout(() => {
          reslove();
        }, 1000)
    })
}