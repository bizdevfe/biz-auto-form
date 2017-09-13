import Limiter from '../Limiter/index';
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
    }

    static defaultProps = {
        title: '',
        defaultValue: '',
        disabled: false,
        limiterRules: null,
        validateRules: {}
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            value: value
        });
    };

    render() {
        const {value} = this.state;
        const {title, disabled, limiterRules, validateRules} = this.props;
        let errorTpl = (<span></span>);
        return (
            <div className="form-item">
                <span className="form-item-title">
                    {validateRules.isRequired ? <label className="red mr5">*</label> : '' }
                    <label>{title}:</label>
                </span>
                <div>
                    <input type="text"
                           value={value}
                           className="input mr5 ml5"
                           onChange={this.handleChange}
                           disabled={disabled}
                    />
                    {limiterRules ? <Limiter rules={limiterRules} currentvalue={value}/> : null}
                    {errorTpl}
                </div>
            </div>
        );
    }
}
export default Input;
