# biz-auto-form 自动生成表单

## 介绍
- 该组件基于React开发，主要用于制作物料表单，用于广告系统中，组件包括表单中常用的一些输入控件可供使用。
- 根据 json 文件自动渲染生成表单，表单中可包含一些特殊的动态输入形式，支持表单校验。
- 只需要依照格式书写 json 文件即可简单快速制作出多种复杂形式的物料表单收集数据。

## 安装
```
npm install @bizfe/biz-auto-form
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
import '@bizfe/biz-auto-form/assets/index.css';
```

引入表单组件中的输入控件
```
import {Input, DateTimeInput, RedWordInput} from '@bizfe/biz-auto-form';
```

## 设计方案
![image](/images/auto-form.png)

该表单自动生成项目中所有组件基于React开发，通过AutoForm组件通过data属性可以回填表单数据，
表单数据格式以json组织，同时通过descriptor属性自动渲染生成整个表单。
所有单个表单字段全部抽象为FormField组件，包括字段名，附加说明，值，默认值，值的校验，
这些全部在FormField中实现，该组件的子组件则为各种基础输入控件controls，输入控件的值会通过onChange事件回传FormField组件。
Form表单中会有一些动态结构的字段，例如GroupField，RadioField，ListField，
用于实现一些带交互的复杂动态表单结构，
这些组件同样以FormField为基础。
其中动态复合组件和基础输入控件均可以扩展。