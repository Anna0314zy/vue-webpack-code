//观察者模式 观察者和被观察者  是有关连的 观察者需要将自己放到被观察者之上，
//当被观察者状态发生变化，需要通知所有的观察者
//我家有个小宝宝 我要监控我家小宝宝的状态
//开心 -- 不开心
class Subject { //被观察者
    constructor(name) {
        this.name = name;
        this.state = '开心';
        this.observers = [];//2个观察者
    }
    attach(o) {//需要将注册者放到自己身上
        this.observers.push(o);//on
    }
    setStach(state) {
        this.state = state;//
        this.observers.forEach(o=> {
            o.update(this); // 去掉观察者的方法 emit
        })

    }
}
class Observer { // 观察者
    constructor(name){
        this.name = name;
    }
    update(s) { //原型上的方法  等会观察者的状态发生变化会调用这个方法
        console.log(this.name + ':'+s.name+'当前的状态'+s.state)
    }
}
let baby = new Subject('小宝宝');
let parent = new Observer('爸爸')
let monther = new Observer('妈妈')
// 被观察者的状态及时更新给观察者
baby.attach(parent);
baby.attach(monther);
baby.setStach('我不开心');
baby.setStach('我》开心');
//核心  观察者  被观察者有关系  基于发布订阅模式