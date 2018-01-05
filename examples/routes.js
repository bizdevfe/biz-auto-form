//引入组件
import Introduce from './Introduce';
import Input from './Input';
import RedWordInput from './controls/RedWordInput';
import Upload from './controls/Upload';
import TextArea from './controls/TextArea';
import LinkTextArea from './controls/LinkTextArea';
import RadioGroup from './controls/RadioGroup';
import DateTimeInput from './controls/DateTimeInput';

import ListField from './form/ListField';
import RadioField from './form/RadioField';

import BasicForm from './form/BasicForm';
import AsyncAutoForm from './form/AsyncAutoForm';

const routes = [
  { path: '/', component: Introduce, exact: true },
  { path: '/Input', component: Input },
  { path: '/RedWordInput', component: RedWordInput },
  { path: '/Upload', component: Upload },
  { path: '/TextArea', component: TextArea },
  { path: '/LinkTextArea', component: LinkTextArea },
  { path: '/RadioGroup', component: RadioGroup },
  { path: '/DateTimeInput', component: DateTimeInput },
  { path: '/BasicForm', component: BasicForm },
  { path: '/ListField', component: ListField },
  { path: '/RadioField', component: RadioField },
  { path: '/AutoForm', component: AsyncAutoForm },
];

export default routes;