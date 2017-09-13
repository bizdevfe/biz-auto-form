import Upload from 'rc-upload';
class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
        const me = this;
        const {uploadRules} = props;
        this.uploaderProps = {
            action: uploadRules.action,
            data: uploadRules.data,
            multiple: true,
            accept: uploadRules.accept,
            beforeUpload(file) {
                const maxSizeKB = uploadRules.maxSize*1024;
                if(file.size>maxSizeKB) {
                    alert(`图片超过${uploadRules.maxSize}KB`);
                    return false;
                }
            },
            onSuccess(file) {
                if(file.status) {
                    me.setState({
                        value: file.data
                    });
                }
            },
            onError(err) {
                console.log('onError', err);
            }
        };
    }
    static defaultProps = {
        title: '',
        disabled: false,
        validateRules: {}
    };
    render() {
        const {value} = this.state;
        const {title, disabled, validateRules} = this.props;
        return (
            <div className="form-item">
                <span className="form-item-title">
                    {validateRules.isRequired ? <label className="red mr5">*</label> : '' }
                    <label>{title}:</label>
                </span>
                <span className="form-item-uploader">
                    <Upload {...this.uploaderProps}>
                        <input type="text"
                               value={value}
                               className="input mr5 ml5  cursor-pointer"
                               disabled={disabled}
                               readOnly
                        />
                        <button className="cursor-pointer">选择文件</button>
                    </Upload>
                </span>
            </div>
        );
    }
}
export default Uploader;
