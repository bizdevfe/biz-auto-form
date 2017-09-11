const config = {
    title: '跳转URL',
    type: 'input',
    value: 'http://',
    disabled: false,
    limiter: 20,
    canBeNull: false
};
class AutoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLen: 0,
            ...config
        };
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            currentLen: value.length,
            value: value
        });
    };

    render() {
        const {title, value, disabled, limiter, canBeNull, currentLen} = this.state;
        let limterText = limiter - currentLen;
        let limterTpl = (
            <span className="gray">
                        <label className="limter">{limterText}</label>
                        字节
                    </span>
        );
        if (limterText < 0) {
            limterText = -limterText;
            limterTpl = (
                <span className="red">超出
                    <label className="limter">{limterText}</label>
                    字节
                </span>
            )
        }
        let errorTpl = (<span></span>);
        return (
            <div>
                <span className="form-title">
                    {canBeNull ? '' : <label className="red mr5">*</label>}
                    <label>{title}:</label>
                </span>
                <div className="item-con">
                    <input type="text"
                           value={value}
                           className="input mr5 ml5"
                           onChange={this.handleChange}
                           disabled={disabled}
                    />
                    {limterTpl}
                    {errorTpl}
                </div>
            </div>
        );
    }
}
export default AutoInput;
