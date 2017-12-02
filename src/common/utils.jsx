/**
 * author: KCFE
 * date: 2017/10/12
 * description: 通用方法
 */
import React from 'react';
import FormField from '../FormField';

import RedWordInput from '../controls/RedWordInput';
import Input from '../controls/Input';
import Textarea from '../controls/Textarea';
import LinkTextarea from '../controls/LinkTextarea';
import ImageUpload from '../controls/ImageUpload';
import DateTimeInput from '../controls/DateTimeInput';
import RadioGroup from '../controls/RadioGroup';

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
      break;
    case 'Input':
      return <Input limiter={field.limiter} />;
      break;
    case 'Textarea':
      return <Textarea limiter={field.limiter} />;
      break;
    case 'LinkTextarea':
      return <LinkTextarea limiter={field.limiter} />;
      break;
    case 'ImageUpload':
      return <ImageUpload uploadRules={field.uploadRules} />;
      break;
    case 'DateTimeInput':
      return <DateTimeInput />;
      break;
    case 'RadioGroup':
      return <RadioGroup options={field.options} />;
      break;
  }
};

/**
 * 根据json配置生成FormField
 * @param jsonConfig
 */
export const generateFormFields = (jsonConfig) => {
  const fields = jsonConfig.map((item, index) => {
    const validateRules = getValidateRules(item.rules);
    return (
      <FormField
        key={`field{index}`}
        name={item.name}
        label={item.label}
        rules={validateRules}
        defaultValue={item.defaultValue}
        tips={item.tips}
      >
        {switchFieldControl(item)}
      </FormField>
    );
  });
  return fields;
};
