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

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

