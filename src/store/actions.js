export default {
  addCart2(context,payload) {
    /*1.查找之前数组中是否有该商品*/
    console.log(payload.iid);
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

    /*2.判断oldProduct*/
    if (oldProduct) {
      context.commit('addCounter',oldProduct)
    } else  {
      payload.count = 1
      /*context.state.cartList.push(payload)*/
      context.commit('addToCart',payload)
    }
  }
}
