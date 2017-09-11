import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import AutoInput from './components/AutoInput';

ReactDom.render(
    <Router>
        <div>
            <ul>
                <li><Link to="/input">input</Link></li>
                <li><Link to="/upload">upload</Link></li>
                <li><Link to="/textarea">textarea</Link></li>
            </ul>

            <hr/>
            <Route path="/input" component={AutoInput}/>
        </div>
    </Router>,
    document.getElementById('app')
);