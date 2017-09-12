import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
import {formJSON} from './formJSON';
class Form extends React.Component {
    render() {
        const formTpl = formJSON.form.map((item, index)=> {
            let component = null;
            switch (item.type) {
                case 'input':
                    component = <Input key={`${index}-form-item`} {...item}/>;
                    break;
                case 'radioGroup':
                    component = <RadioGroup key={`${index}-form-item`} {...item}/>;
                    break;
                default:
                    break;
            }
            return component;
        });
        return (
            <div>
                {formTpl}
            </div>
        );
    }
}
export default Form;
