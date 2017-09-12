import RadioGroup from './RadioGroup';
const config = {
    title: '应用下载模块',
    name: 'appExist',
    radios: [{
        title: '有',
        content: [
            {
                type: 'input',
                title: 'APP名称',
                disabled: false,
                limiterRules: {
                    type: 'byte',
                    min: 1,
                    max: 12
                },
                validateRules: {
                    isRequired: false
                }
            },
            {
                type: 'input',
                title: 'APP的安卓下载链接',
                disabled: false,
                defaultValue: 'http://',
                limiterRules: {
                    type: 'byte',
                    min: 1,
                    max: 505
                },
                validateRules: {
                    isRequired: false
                }
            }
        ]
    }, {
        title: '无',
        content: null,
        actived: true
    }]
};
class Container extends React.Component {
    render() {
        return (
            <RadioGroup {...config}/>
        );
    }
}
export default Container;
