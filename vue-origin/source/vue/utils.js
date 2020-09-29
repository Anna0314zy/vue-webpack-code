export const utils = {
    getValue(vm, expor) { //school.name
        //console.log(expor, 'expor'); // school.name
        let keys = expor.split('.');
        // console.log(keys, 'keys');//['school', 'name']
        return keys.reduce((memo, current) => { //reduce具备迭代的功能
            // console.log(memo, current, 'memo, current');
            memo = memo[current];// memo = vm.school
            // console.log(memo, 'memo---');
            return memo; // return vm['school']['name']
        }, vm); //第一次 memo = vm current school 下一次  memo 就是vm[school]
    },
    compilerText(node, vm) { // 编译文本 替换{{}}
        // console.log(node, 'compilerText');
        // let //vue.1.0写法  虚拟dom会重写这个过程\
        //?:匹配不捕获 不捕获当前的分组
        //  +至少一个 
        //  ？ 尽可能少匹配
        //源码里的模板编译 也是基于正则的  mac下没有\r  .是任意字符
        // debugger;  不是很懂 打印不出node.textContent 但是还能匹配 不是很懂。。。
        //TODO: 不清楚 不是很懂 打印不出node.textContent 但是还能匹配 不是很懂。。。
        // 如果下次去更新页面的值的时候 页面中的花括号已经没有了 所有找一个值先暂存表达式 下次直接改就可以了
        if (!node.expr) {
            node.expr = node.textContent; //给节点增加了一个自定义属性 为了后续的更新
        }
      //?: 匹配不捕获 （中间捕获到的数据可以作为一个整体出现） +至少一个  ？尽可能少匹配
      //   const reg = /\{\{(?:.|\r\n)+?\}\}/
        //源码的模板编译 也是基于正则的 mac是没有\r的 可有可无就加个？号
        const defalutRe = /\{\{((?:.|\r?\n)+?)\}\}/g;
        //再次设置的时候 花括号已经没有了  变成值了 就没有效果了
        // console.log(node.expr, node.textContent);
        node.textContent = node.expr.replace(defalutRe, function (...args) {
            console.warn(utils.getValue(vm, args[1]), 'utils.getValue(vm, args[1])');
            
            // return utils.getValue(vm, args[1]); {{school.name}}  所以要先把school取出来
            return JSON.stringify(utils.getValue(vm, args[1]));
            // return 
        })
    }
}




export function compiler(node, vm) {
    let childNodes = node.childNodes;//只有第一层  只有儿子没有孙子
    // console.log(childNodes, 'childNodes');
    //将类数组转换成数组
    [...childNodes].forEach(child => { //一种是元素 一种是文本
        if (child.nodeType == 1) {//1元素 3是文本
            compiler(child, vm); //编译当前元素的孩子节点
        } else if (child.nodeType == 3) {
            utils.compilerText(child, vm);
        }

    })
}