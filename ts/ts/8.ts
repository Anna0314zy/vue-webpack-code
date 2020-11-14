//泛型 指在定义函数 接口 类的时候 不预先指定具体的类型 而是在使用的时候在指定类型的一种特性
//泛型T作用域只限于函数内部使用
//意义在哪里
namespace a {
    function createArray<T>(length: number, value: T): Array<T> {
        let result: Array<T> = [];
        for (let i = 0; i < length; i++) {
            result[i] = value; //前面有泛型 这里就不能写 reslut[i] = 1;
        }
        return result;
    }
    //使用的时候指定类型
    let result = createArray<string>(3, 'x'); //value 值不固定 用的时候传一个值
    //想达到 vaule 是个啥类型的 返回值就是什么类型的数组
    console.log(result);
    //类数组 
    function sum(...args2: any[]) {
        let args: IArguments = arguments;
        for (let i = 0; i < args.length; i++) {
            console.log(args[i]);
        }
    }
    // sum(1, 2, 3, '4');
    //编译文件  "lib": ["dom",....], 
    // let root: HTMLElement | null = document.getElementById('root');
    // let children: HTMLCollection = root!.children;
    // let childNodes: NodeListOf<ChildNode> = root!.childNodes;
    //类的泛型
    class MyArray<T> {
        private list: T[] = [];
        add(val: T) {
            this.list.push(val);
        }
        getMax(): T {
            let result = this.list[0];
            for (let i = 1; i < this.list.length; i++) {
                if (this.list[i] > result) {
                    result = this.list[i];
                }
            }
            return result;
        }
    }
    let arr = new MyArray<number>();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    let result3: number = arr.getMax();
    console.log(result3);
    //接口泛型
    interface Calculate {
        <T>(a: T, b: T): T
    }
    let add: Calculate =  function <T>(a: T, b: T): T {
        return a;
    }
    let res = add<number>(5, 2);
    console.log(res);
    //多个 类型参数  如何在不增加中间变量的情况下 交换一个变量的值
    function swap<A, B>(tuple:[A, B]):[B,A]{
        return [tuple[1], tuple[0]]
    }
    let res2 = swap<string, number>(['zhufeng', 10]);
    console.log(res2)
    //泛型的约束  用interface去约束泛型
    //在函数使用泛型的时候 由于预先并不知道具体的类型 所以不能访问相应的类型方法
interface LengthWise {
    length: number
}
    
    function logger<T extends LengthWise>(val:T) {
        console.log(val.length);
    }
    logger('zuhu');
    interface Car<T> {
        list: T[]
    }
    let cart: Car<string> = {
        list: ['1', '2', '3']
    }
    //泛型类型别名 type 别名不能被继承和  implements
    type Cart2<T> = {list:T[] } | T[];
    let c1:Cart2<string> = {list:['1']};
    let c2: Cart2<string> = ['1'];
  
    //interface 定义一个实实在在的接口 是一个真正的类型
    //type 一般用来定义别名 并不是一个真正的类型


}