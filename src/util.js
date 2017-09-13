import Input from './components/Input/index';
import RadioGroup from './components/RadioGroup/index';

export default {
    generateComponents: (componentsConfig)=>{
        const components = componentsConfig.map((item, index)=> {
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
        return (<div className="components-container">{components}</div>);
    },
    getStrBytes: (str)=> {
        var byteLen = 0;
        if (str) {
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 255) {
                    byteLen += 2;
                } else {
                    byteLen++;
                }
            }
        }
        return byteLen;
    }
};
