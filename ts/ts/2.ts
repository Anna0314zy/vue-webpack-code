function hello(name:string):void {
    console.log('hello'+name);
}
//函数表达式 
//type 用来定义一个类型 类型别名
type GetUserNameType = (firstname: string, lastname: string) => string;
let getUsername:GetUserNameType = function(firstname:string, lastname:string):string {
    return firstname + lastname;
}
//可选参数
function print(name:string, age?:number, home?: string) {

}
print('zhufeng');//少传一个不行 上面加？
//默认参数
function ajax(url:string, method:string = 'GET') {
console.log(url, method);
}
ajax('http');
ajax('http', 'POST');
//剩余参数
function sum(...numbers:Array<number>) {
    return numbers.reduce((accu, item) => accu + item, 0)
}
console.log(sum(1,3,4));
//函数重载
//no overload expects 1 argument
let obj:any = {};
//函数重载 和 函数定义要放在一起
function attr(val:string):void;
function attr(val:number):void;
function attr(val:any):void {
    if (typeof val === 'string') {
        obj.name = val;
    }else if (typeof val === 'number') {
        obj.age = val;
    }
}
attr('zhufeng');
attr(10);
//attr(true);//不行
function sum2(a: string, b: string):void;
function sum2(a: number, b: number):void;
function sum2(a:any,b:any) {
    return a + b;
}
sum2('5', '5');
//ts 怎么写箭头函数 跟js一样
let delay = (ms:number) => {
    setTimeout(() => {
        console.log('hello');
    }, ms)
}

