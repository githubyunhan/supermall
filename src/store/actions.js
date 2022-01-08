export default {
  addCart2(context,payload) {
    return new Promise((resolve, reject) =>{
      /*1.查找之前数组中是否有该商品*/
      console.log(payload.iid);
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      /*2.判断oldProduct*/
      if (oldProduct) {/*数量加1*/
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量+1')
      } else  {/*添加新的商品*/
        payload.count = 1
        /*context.state.cartList.push(payload)*/
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }
    })
  }
}
