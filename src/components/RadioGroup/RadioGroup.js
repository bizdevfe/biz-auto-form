import Input from '../Input/Input';

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        let activeIndex = 0;
        props.radios.forEach((radioConfig, index)=> {
            if (radioConfig.actived) {
                activeIndex = index;
                return false;
            }
        });
        this.state = {
            activeIndex: activeIndex
        };
    }

    static defaultProps = {
        title: '',
        radios: []
    };
    handleChange = (e) => {
        const index = e.target.id.split('-')[0];
        this.setState({
            activeIndex: parseInt(index)
        });
    };
    getRadiosTitleTpl = (activeIndex) => {
        const {radios, name, title} = this.props;
        const radiosTitle = radios.map((radio, index)=> {
            return (
                <span key={`${title}-radio-${index}`}>
                    <input type="radio"
                           name={name}
                           id={`${index}-${title}-radio`}
                           value={radio.title}
                           checked={index===activeIndex}
                           onChange={this.handleChange}/>
                    <label htmlFor={`${index}-${title}-radio`}>{radio.title}</label>
                </span>
            );
        });
        return (
            <div className="form-item">
                <span className="form-item-title">
                    <label>{title}:</label>
                </span>
                {radiosTitle}
            </div>
        );
    };
    getRadiosContentTpl = (activeIndex) => {
        const contentConfig = this.props.radios[activeIndex];
        let radiosContent = null;
        if(contentConfig.content) {
            radiosContent = contentConfig.content.map((config,index)=> {
                let component = null;
                switch (config.type) {
                    case 'input':
                        component = <Input key={`${index}-radio-content`} {...config}/>;
                        break;
                    default:
                        break;
                }
                return component;
            });
        }
        return radiosContent;
    };

    render() {
        const {activeIndex} = this.state;
        const radiosTitle = this.getRadiosTitleTpl(activeIndex);
        const radiosContent = this.getRadiosContentTpl(activeIndex);
        return (
            <div>
                {radiosTitle}
                {radiosContent}
            </div>
        );
    }
}
export default RadioGroup;
