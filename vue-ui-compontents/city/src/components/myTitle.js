export default {
    functional:true, //函数组件 只能写render
    methods:{
      
    },
    render(h, context) {
        console.log(context, 'context上下文');
        let t = 'h'+context.props.type; 
        return <t on-click={()=>context.props.fn()}>{context.slots().default}</t>
    }
}