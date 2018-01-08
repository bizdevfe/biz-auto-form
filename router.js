import React from 'react';
import {
  HashRouter,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import routes from './routes';

const Router = () => (
  <HashRouter>
    <div className="container-inner">
      <nav className="aside-nav" style={{}}>
        <ul>
          <li><NavLink to="/" exact>首页介绍</NavLink></li>
          <li><NavLink to="/BasicForm" exact>基础表单示例</NavLink></li>

          <li>表单自动生成：</li>
          <li>
            <ul className="sub-nav">
              <li><NavLink to={{pathname: '/AutoForm/basic'}} exact >自动表单</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm/311'}} exact>背景图样式（311）</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm/313'}} exact>大图样式（313）</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm/314'}} exact>大图倒计时样式（314）</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm/315'}} exact>视频样式1（315）</NavLink></li>
              <li><NavLink to={{pathname: '/AutoForm/316'}} exact>视频样式2（316）</NavLink></li>
            </ul>
          </li>

          <li>controls基础控件：</li>
          <li>
            <ul className="sub-nav">
              <li><NavLink to="/Input" exact>输入框</NavLink></li>
              <li><NavLink to="/Upload" exact>图片视频上传</NavLink></li>
              <li><NavLink to="/RadioGroup" exact>RadioGroup</NavLink></li>
              <li><NavLink to="/DateTimeInput" exact>日期时间输入</NavLink></li>
            </ul>
          </li>

          <li>动态表单结构：</li>
          <li>
            <ul className="sub-nav">

              <li><NavLink to="/ListField" exact>组合字段列表</NavLink></li>
              <li><NavLink to="/RadioField" exact>Radio字段组合</NavLink></li>
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
  </HashRouter>
);

export default Router;