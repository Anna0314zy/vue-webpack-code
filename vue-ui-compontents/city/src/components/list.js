export default {
    functional: true,
    props:['render', 'a'],
    render(h, context) {
        const a= context.props.a;
        console.log(a, 'a');
        return context.props.render(h, a);
    }
}