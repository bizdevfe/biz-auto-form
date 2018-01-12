/**
 * author: KCFE
 * date: 2017/10/12
 * description: 通用方法
 */
import React from 'react';
import FormField from '../FormField';

import ValidateRules from './validateRules';


/**
 * 获取字符串字节长度
 * @param str
 * @returns {number}
 */
export const getStrBytes =  (str) => {
  let byteLen = 0;
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        byteLen += 2;
      } else {
        byteLen++;
      }
    }
  }
  return byteLen;
};

/**
 * 去掉空格字符
 * @param str
 */
export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 插入标红词和插入链接中，过滤掉符号
 * @param str
 */
export const filterSymbol =  (str) => {
  return str.replace(/\{(.*?)\|\|.*?\}/g,'$1').replace(/[\{\}]/g, '');
};

/**
 * 将json配置中校验规则转化为校验规则对象数组
 * @param rules
 * @returns {*}
 */
export const getValidateRules = (rules) => {
  if( Array.isArray(rules) ){
    return rules;
  }
  return Object.keys(rules).map((key) => {
    const arg = rules[key];
    if(arg === true){
      return ValidateRules[key];
    }
    return ValidateRules[key](arg);
  });
};

/**
 * 转化FormField中的输入控件
 * @param field
 * @returns {XML}
 */
export const switchFieldControl = (field) => {
  const control = field.control;
  switch (control) {
    case 'RedWordInput':
      return <RedWordInput limiter={field.limiter} />;
    case 'Input':
      return <Input limiter={field.limiter} />;
    case 'TextArea':
      return <TextArea limiter={field.limiter} />;
    case 'LinkTextArea':
      return <LinkTextArea limiter={field.limiter} />;
    case 'ImageUpload':
      return <ImageUpload uploadRules={field.uploadRules} />;
    case 'VideoUpload':
      return <VideoUpload uploadRules={field.uploadRules} />;
    case 'DateTimeInput':
      return <DateTimeInput />;
    case 'RadioGroup':
      return <RadioGroup options={field.options} />;
  }
};

/**
 * 筛选出props中的key
 * @param obj
 * @param keys
 * @returns {{}}
 */
export const pick = (obj, ...keys) => {
  let result = {};
  for (let i = 0; i < keys.length; i++) {
    if(key in obj){
      result[keys[i]] = obj[keys[i]];
    }
  }
  return result;
};

/**
 * 过滤除去props中的key
 * @param obj
 * @param keys
 * @returns {{}}
 */
export const omit = (obj, ...keys) => {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};
