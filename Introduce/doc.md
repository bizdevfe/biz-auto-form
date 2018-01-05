# biz-auto-form 自动生成表单

## 介绍
- 该组件基于React开发，主要用于制作表单，组件包括表单中常用的一些输入控件可供使用。
- 根据 json 文件自动渲染生成表单，表单中可包含一些特殊形式动态输入形式，支持表单校验。
- 只需要依照格式书写 json 文件即可简单快速制作出多种复杂形式的表单收集数据。

## 安装
```
npm install biz-auto-form
```

## 示例
```
import {AutoForm} from '@bizfe/biz-auto-form';

ReactDom.render(
    <AutoForm
        data={rightObj}
        onSubmit={$.proxy(this.handleSubmit, this)}
        descriptor={formDesc}
        formRef={(form) => {this.form = form;}}
    />,
    this.el
);
```
引入样式：
```
import 'biz-auto-form/assets/index.css';
```

引入表单组件中的输入控件
```
import {Input, DateTimeInput, RedWordInput} from '@bizfe/biz-auto-form';
```