import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Form from './components/Form/index';
import Input from './components/Input/Container';
import RadioGroup from './components/RadioGroup/Container';

ReactDom.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/form">form</Link></li>
                <li><Link to="/input">input</Link></li>
                <li><Link to="/radioGroup">radioGroup</Link></li>
                <li><Link to="/upload">upload</Link></li>
                <li><Link to="/textarea">textarea</Link></li>
            </ul>

            <hr/>
            <Route path="/form" component={Form}/>
            <Route path="/input" component={Input}/>
            <Route path="/radioGroup" component={RadioGroup}/>
        </div>
    </Router>,
    document.getElementById('app')
);