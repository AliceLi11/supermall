const mutations = {
  addCart(state,info){
    //1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.id === info.id)

    //2.+1或者新添加
    if(oldInfo){
      oldInfo.count += 1 ;
      alert("老的商品加1")
    }else{
      info.count = 1;
      info.checked = true;
      state.cartList.push(info);
      alert("新的商品+1")
    }
  }
}

export default mutations
