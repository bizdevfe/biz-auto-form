//引入组件
import Introduce from './Introduce';
import Input from './Input';
import Upload from './Upload';
import RadioGroup from './RadioGroup';
import DateTimeInput from './DateTimeInput';

import ListField from './form/ListField';
import RadioField from './form/RadioField';

import BasicForm from './form/BasicForm';
import AsyncAutoForm from './form/AsyncAutoForm';

const routes = [
  { path: '/', component: Introduce, exact: true },
  { path: '/Input', component: Input },
  { path: '/Upload', component: Upload },
  { path: '/RadioGroup', component: RadioGroup },
  { path: '/DateTimeInput', component: DateTimeInput },
  { path: '/BasicForm', component: BasicForm },
  { path: '/ListField', component: ListField },
  { path: '/RadioField', component: RadioField },
  { path: '/AutoForm/:id', component: AsyncAutoForm },
];

export default routes;