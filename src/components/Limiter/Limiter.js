import util from '../../util';
class Limiter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentvalue: props.currentvalue
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentvalue !== this.state.currentvalue) {
            this.setState({
                currentvalue: nextProps.currentvalue
            });
        }
    }

    getLength = (string)=> {
        const {type} = this.props.rules;
        let length = util.getStrBytes(string);
        if (type === 'character') {
            length = string.length;
        }
        return length;
    };

    render() {
        const {rules} = this.props;
        const {currentvalue} = this.state;
        const currentLen = this.getLength(currentvalue);
        const {min, max} = rules;
        let limiterTpl = null;
        const limiterText = max - currentLen;
        limiterTpl = (
            <span className="gray">
                    <label className="limiter">{limiterText}</label>
                    字节
                </span>
        );
        if (limiterText < 0) {
            limiterTpl = (
                <span className="red">
                        超出
                        <label className="limiter">{-limiterText}</label>
                        字节
                    </span>
            );
        }
        return limiterTpl;
    }
}
export default Limiter;
