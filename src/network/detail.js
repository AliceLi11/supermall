import request from "./request"

export function getDetails(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

//ES6的类，完全可以看作构造函数的另一种写法。这样体现了，面向对象封装的思想
//这里把很多个乱七八糟的数据中找到想要的整合成了一个对象供组件使用
//思路：先把很多从服务器返回的数据先给他封装到一个类里面，再来创建对应这个类的对象，然后用对象给它传到组件里面，让组件对这一层东西进行展示

//商品信息
export class Goods{
  constructor(itemInfo,columns,services){
      this.title = itemInfo.title;
      this.desc = itemInfo.desc;
      this.newPrice = itemInfo.price;
      this.oldPrice = itemInfo.oldPrice;
      this.discount = itemInfo.discountDesc;
      this.columns = columns;
      this.services = services;
      this.nowPrice = itemInfo.highNowPrice;
  }
}
/*es5写法
function Point(x, y) {
  this.x = x;
  this.y = y;
}
var p = new Point(1, 2);
*/

//商家信息
export class Shop{
  constructor(shopinfo){
    this.logo = shopinfo.shopLogo;
    this.name = shopinfo.name;
    this.fans = shopinfo.cFans;
    this.sells = shopinfo.cSells;
    this.score = shopinfo.score;
    this.goodsCount = shopinfo.cGoods;
  }
}