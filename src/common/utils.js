//防抖动函数
export function debounce(fn,delay){
  let timer = null;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}

/*
*日期格式化
y+：匹配1个到多个y
RegExp.$1:RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
test:方法用于检测一个字符串是否匹配某个模式，如果字符串中有匹配的值返回 true ，否则返回 false。
replace:用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
substr:方法可在字符串中抽取从 start 下标开始的指定数目的字符。
*/

//正则表达式是干什么的？字符串匹配 利器（难，规则太多）
export function formatDate(date, fmt) {
  //1.获取年，将'yyyy-mm-dd'中的'yyyy'匹配出来，换成格式化并且截取过想要长度的年份
  //y
  //y+ -> 1个或者多个y
  //y* -> 0个或者多个y
  //y? -> 0个或者1个y
  //2019
  //yy - 19
  //yyyy - 2019
  //y - 9
  //yyy - 019
  //RegExp.$1这里值匹配到的y(几个y由fmt中定义的)
  //date.getFullYear() + ''-》js运算将数字转换成字符串
  //replace将匹配到的如'yyyy'转换成(date.getFullYear() + '').substr(4 - RegExp.$1.length)=》如('2019').substr(0)=>2019，后面substr将转换成的年做截取，2位就变成了19,3位就变成了了019...
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取
  //这个和年不做一起处理是因为，处理方式不同
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),//h和H也可做区分，要学会自己修改成自己想要的
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    //如果匹配到了o中的属性
    if (new RegExp(`(${k})`).test(fmt)) {
      //将数字转换成字符串
      let str = o[k] + '';
      //如果想要的格式就1个长度，直接等于格式化后的字符串，否则，就用padLeftZero函数再做处理（把格式化后一位数的转成2位数，2位数的还是2位数）
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

//如果想要的格式是2位的，但是格式化后的字符串不是2位的，就在这个函数中处理成想要的
function padLeftZero(str) {
  //0004->04
  //004->04
  return ('00' + str).substr(str.length);
};
