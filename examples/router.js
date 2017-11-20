import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom'

//引入组件
import Input from './components/Input';
import RedWordInput from './components/RedWordInput';
import ImageInput from './components/ImageInput';
import Textarea from './components/Textarea';
import LinkTextarea from './components/LinkTextarea';
import BasicForm from './form/BasicForm';
import AutoForm from './form/AutoForm';
import AutoForm1 from './form/AutoForm1';

const Router = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/Input">Input</Link></li>
        <li><Link to="/RedWordInput">插入标红词</Link></li>
        <li><Link to="/ImageInput">图片上传</Link></li>
        <li><Link to="/Textarea">文本区</Link></li>
        <li><Link to="/LinkTextarea">输入链接的文本区</Link></li>
        <li><Link to="/BasicForm">基础表单</Link></li>
        <li><Link to="/AutoForm">自动表单</Link></li>
        <li><Link to="/AutoForm1">自动表单(带列表)</Link></li>
      </ul>

      <hr/>

      <Switch>
        <Route exact path="/" component={Input}/>
        <Route path="/Input" component={Input}/>
        <Route path="/RedWordInput" component={RedWordInput}/>
        <Route path="/ImageInput" component={ImageInput}/>
        <Route path="/Textarea" component={Textarea}/>
        <Route path="/LinkTextarea" component={LinkTextarea}/>
        <Route path="/BasicForm" component={BasicForm}/>
        <Route path="/AutoForm" component={AutoForm}/>
        <Route path="/AutoForm1" component={AutoForm1}/>
      </Switch>
    </div>

  </BrowserRouter>
);

export default Router;