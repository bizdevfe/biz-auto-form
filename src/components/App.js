import axios from 'axios';
import util from '../util';

class App extends React.Component {
    constructor(props) {
        super(props);
        const type = 'form';
        this.state = {
            json: {form: []}
        };
        this.getJSON('/mock/' + type + '.json');
    }

    changeComponent = (e) => {
        const type = e.target.type;
        this.getJSON('/mock/' + type + '.json');
    };

    getJSON = (url) => {
        axios.get(url)
            .then((response) => {
                this.setState({
                    json: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    menuTpl = (
        <ul>
            <li><a href="javascript:void(0);" type="form" onClick={this.changeComponent}>form</a></li>
            <li><a href="javascript:void(0);" type="input" onClick={this.changeComponent}>input</a></li>
            <li><a href="javascript:void(0);" type="uploader" onClick={this.changeComponent}>uploader</a></li>
            <li><a href="javascript:void(0);" type="radioGroup" onClick={this.changeComponent}>radioGroup</a></li>
        </ul>
    );

    render() {
        const {json} = this.state;
        const components = util.generateComponents(json.form);
        return (
            <div>
                {this.menuTpl}
                <hr/>
                {components}
            </div>
        );
    };
}
export default App;