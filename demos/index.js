import React from 'react';
import ReactDom from 'react-dom';
import InputTest from './input/test';
import TitleTest from './input/TitleTest';
import TextareaTest from './textarea/test';
import DescTest from './textarea/DescTest';

import RedWordInput from '../src/components/RedWordInput';
import Input from '../src/components/Input';
import Textarea from '../src/components/Textarea';
import LinkTextarea from '../src/components/LinkTextarea';
import ImageInput from '../src/components/ImageInput';
import Form from '../src/components/Form';
import FormItem from '../src/components/FormItem';

const app = (
  <Form onSubmit={(values) => {console.log(values);}}>
    <FormItem
      name="title"
      label="标题"
      tip="标题中可以插入标红词"
    >
      <RedWordInput
        limiter={{
          max: 24
        }}
      />
    </FormItem>

    <FormItem
      name="link"
      label="链接"
    >
      <Input
        limiter={{
          max: 512
        }}
      />
    </FormItem>

    <FormItem
      name="description"
      label="描述"
    >
      <Textarea
        limiter={{
          max: 24
        }}
      />
    </FormItem>

    <FormItem
      name="descriptionLink"
      label="子链描述"
    >
      <LinkTextarea
        limiter={{
          max: 50
        }}
      />
    </FormItem>

    <FormItem
      name="image"
      label="图片"
    >
      <ImageInput
        value="http://"
        uploadRules={{
          size: 20,
          types: ['png'],
          key: '200x100'
        }}
      />
    </FormItem>
  </Form>
);

ReactDom.render(
  app,
  document.getElementById('app')
);