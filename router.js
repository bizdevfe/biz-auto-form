import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';

//引入组件
import Home from './Home';
import Input from './controls/Input';
import RedWordInput from './controls/RedWordInput';
import ImageUpload from './controls/ImageUpload';
import TextArea from './controls/TextArea';
import LinkTextArea from './controls/LinkTextArea';
import RadioGroup from './controls/RadioGroup';
import DateTimeInput from './controls/DateTimeInput';

import ListField from './form/ListField';
import RadioField from './form/RadioField';

import BasicForm from './form/BasicForm';
import AsyncAutoForm from './form/AsyncAutoForm';

const Router = () => (
  <BrowserRouter>
    <div style={{ display: 'flex' }}>
      <div style={{padding: '10px', width: '200px', background: '#f0f0f0'}}>
        <ul>
          <li>基础控件：</li>
          <li><Link to="/Input">Input</Link></li>
          <li><Link to="/RedWordInput">插入标红词</Link></li>
          <li><Link to="/ImageUpload">图片上传</Link></li>
          <li><Link to="/TextArea">文本区</Link></li>
          <li><Link to="/LinkTextArea">输入链接的文本区</Link></li>
          <li><Link to="/RadioGroup">Radio</Link></li>
          <li><Link to="/DateTimeInput">日期时间</Link></li>

          <li>表单：</li>
          <li><Link to="/BasicForm">基础控件表单</Link></li>
          <li><Link to="/ListField">组合字段列表</Link></li>
          <li><Link to="/RadioField">Radio字段组合</Link></li>

          <li>表单生成：</li>
          <li><Link to={{pathname: '/AutoForm', state: {descriptor: 'basic_form'}}}>自动表单</Link></li>
          <li><Link to={{pathname: '/AutoForm', state: {descriptor: 'list_form'}}}>自动表单(大小图)</Link></li>
          <li><Link to={{pathname: '/AutoForm', state: {descriptor: 'list_form1'}}}>自动表单(大图倒计时)</Link></li>
          <li><Link to={{pathname: '/AutoForm', state: {descriptor: 'radio_form'}}}>自动表单(背景图)</Link></li>
        </ul>
      </div>

      <div style={{padding: '10px', flex: 1}}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Input" component={Input}/>
          <Route path="/RedWordInput" component={RedWordInput}/>
          <Route path="/ImageUpload" component={ImageUpload}/>
          <Route path="/TextArea" component={TextArea}/>
          <Route path="/LinkTextArea" component={LinkTextArea}/>
          <Route path="/RadioGroup" component={RadioGroup}/>
          <Route path="/DateTimeInput" component={DateTimeInput}/>

          <Route path="/BasicForm" component={BasicForm}/>
          <Route path="/ListField" component={ListField}/>
          <Route path="/RadioField" component={RadioField}/>

          <Route path="/AutoForm" component={AsyncAutoForm}/>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default Router;