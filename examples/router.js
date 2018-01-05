import React from 'react';
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import routes from './routes';

const Router = () => (
  <BrowserRouter>
    <div className="container-inner">
      <nav className="aside-nav" style={{}}>
        <ul>
          <li><NavLink to="/" exact>首页介绍</NavLink></li>
          <li>基础控件：</li>
          <li>
            <ul className="sub-nav">
              <li><NavLink to="/Input" exact>Input</NavLink></li>
              <li><NavLink to="/RedWordInput" exact>插入标红词</NavLink></li>
              <li><NavLink to="/Upload" exact>图片视频上传</NavLink></li>
              <li><NavLink to="/TextArea" exact>文本区</NavLink></li>
              <li><NavLink to="/LinkTextArea" exact>输入链接的文本区</NavLink></li>
              <li><NavLink to="/RadioGroup" exact>Radio</NavLink></li>
              <li><NavLink to="/DateTimeInput" exact>日期时间</NavLink></li>
            </ul>
          </li>

          <li>表单：</li>
          <li>
            <ul className="sub-nav">
              <li><NavLink to="/BasicForm" exact>基础控件表单</NavLink></li>
              <li><NavLink to="/ListField" exact>组合字段列表</NavLink></li>
              <li><NavLink to="/RadioField" exact>Radio字段组合</NavLink></li>
            </ul>
          </li>

          <li>表单生成：</li>
          <li>
            <ul className="sub-nav">
              <li><NavLink to={{pathname: '/AutoForm', state: {descriptor: 'basic_form'}}}>自动表单</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm', state: {descriptor: 'list_form'}}}>自动表单(大小图)</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm', state: {descriptor: 'list_form1'}}}>自动表单(大图倒计时)</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm', state: {descriptor: 'radio_form'}}}>自动表单(背景图)</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm', state: {descriptor: 'video_form2'}}}>视频样式1</NavLink></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="main-body">
        <div className="body-inner">
          <Switch>
            {
              routes.map((route, index) => (
                <Route key={index} {...route} />
              ))
            }
          </Switch>
        </div>
      </div>
    </div>
  </BrowserRouter>
);

export default Router;