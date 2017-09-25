import axios from 'axios';
import util from '../util';
const types = ['form','input','uploader','radioGroup'];
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
            {types.map((type)=>{
                return <li><a href="javascript:void(0);" type={type} onClick={this.changeComponent}>{type}</a></li>
            })}
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