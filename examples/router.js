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
import Textarea from './controls/Textarea';
import LinkTextarea from './controls/LinkTextarea';
import RadioGroup from './controls/RadioGroup';

import ListField from './form/ListField';
import RadioField from './form/RadioField';

import BasicControls from './form/BasicControls';
import AutoForm from './form/AutoForm';
import AutoForm1 from './form/AutoForm1';

const Router = () => (
  <BrowserRouter>
    <div style={{ display: 'flex' }}>
      <div style={{padding: '10px', width: '200px', background: '#f0f0f0'}}>
        <ul>
          <li>基础控件：</li>
          <li><Link to="/Input">Input</Link></li>
          <li><Link to="/RedWordInput">插入标红词</Link></li>
          <li><Link to="/ImageUpload">图片上传</Link></li>
          <li><Link to="/Textarea">文本区</Link></li>
          <li><Link to="/LinkTextarea">输入链接的文本区</Link></li>
          <li><Link to="/RadioGroup">Radio</Link></li>
          <li>复合结构：</li>
          <li><Link to="/ListField">组合字段列表</Link></li>
          <li><Link to="/RadioField">Radio字段组合</Link></li>
          <li>表单生成：</li>
          <li><Link to="/BasicControls">基础控件表单</Link></li>
          <li><Link to="/AutoForm">自动表单</Link></li>
          <li><Link to="/AutoForm1">自动表单(带列表)</Link></li>
        </ul>
      </div>

      <div style={{padding: '10px', flex: 1}}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/Input" component={Input}/>
          <Route path="/RedWordInput" component={RedWordInput}/>
          <Route path="/ImageUpload" component={ImageUpload}/>
          <Route path="/Textarea" component={Textarea}/>
          <Route path="/LinkTextarea" component={LinkTextarea}/>
          <Route path="/RadioGroup" component={RadioGroup}/>
          <Route path="/ListField" component={ListField}/>
          <Route path="/RadioField" component={RadioField}/>
          <Route path="/BasicControls" component={BasicControls}/>
          <Route path="/AutoForm" component={AutoForm}/>
          <Route path="/AutoForm1" component={AutoForm1}/>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default Router;