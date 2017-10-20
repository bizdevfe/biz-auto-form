/**
 * author: KCFE
 * date: 2017/10/12
 * description: 通用方法
 */
export const getStrBytes =  (str) => {
  var byteLen = 0;
  if (str) {
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        byteLen += 2;
      } else {
        byteLen++;
      }
    }
  }
  return byteLen;
};

export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

export const filterSymbol =  (str) => {
  return str.replace(/\{(.*?)\|\|.*?\}/g,'$1').replace(/[\{\}]/g, '');
};