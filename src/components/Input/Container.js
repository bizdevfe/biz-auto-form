import Input from './Input';
const config = {
    title: '跳转URL',
    defaultValue: 'http://',
    disabled: false,
    limiterRules: {
        type: 'byte',
        min: 1,
        max: 20
    },
    validateRules: {
        isRequired: true
    }
};
class Container extends React.Component {
    render() {
        return (
            <Input {...config}/>
        );
    }
}
export default Container;
