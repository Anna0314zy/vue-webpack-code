// export default [
//   {
//     path: '/contact',
//     name: 'contact',
//     component: {
//       render(h) {
//         return <h1 > 联系我 </h1>;
//       },
//     },
//   }, {
//     path: '/service',
//     name: 'service',
//     component: {
//       render(h) {
//         return <h1 > 服务 </h1>;
//       },
//     },
//   },
// ];
export default [
  {
    path: '/cart',
    name: 'cart',
    component: {
      render() {
        return <h1>购物车页面</h1>;
      },
    },
    children: [
      {
        path: '/cart-list',
        name: 'cart-list',
        component: {
          render() {
            return <h1>购物车列表</h1>;
          },
        },
        children: [
          {
            path: '/lottery',
            name: 'lottery',
            component: {
              render() {
                return <h1 > 彩票 < /h1>;
              },
            },
          },
          {
            path: '/product',
            name: 'product',
            component: {
              render() {
                return <h1 > 商品 < /h1>;
              },
            },
          },
        ],
      },
    ],
  },
];
