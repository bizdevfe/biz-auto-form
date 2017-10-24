import React from 'react';
import ReactDom from 'react-dom';
import InputTest from './input/test';
import TitleTest from './input/TitleTest';
import TextareaTest from './textarea/test';
import DescTest from './textarea/DescTest';

import '../src/components/ImageInput';
import '../src/styles/form.less';
import ImageInput from "../src/components/ImageInput";

const app = (
  <div>
    <div className="form-item">
      <label className="item-title">
        <em className="red-star">*</em>标题：
      </label>
      <div className="item-con">
        <TitleTest />
      </div>
    </div>

    <div className="form-item">
      <label className="item-title">
        <em className="red-star">*</em>链接：
      </label>
      <div className="item-con">
        <InputTest />
      </div>
    </div>

    <div className="form-item">
      <label className="item-title">
        <em className="red-star">*</em>描述：
      </label>
      <div className="item-con">
        <TextareaTest />
      </div>
    </div>

    <div className="form-item">
      <label className="item-title">
        <em className="red-star">*</em>描述1：
      </label>
      <div className="item-con">
        <DescTest />
      </div>
    </div>

      <div className="form-item">
        <label className="item-title">
          <em className="red-star">*</em>图片：
        </label>
        <div className="item-con">
          <ImageInput
            value='http://xx.png'
            uploadRules={{
              size: 20,
              exts: 'png',
              key: '200x100'
            }}
          />
        </div>
      </div>
  </div>
);

ReactDom.render(
  app,
  document.getElementById('app')
);