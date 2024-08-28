import {
    Switch,
    Route
} from 'react-router-dom';
import AuthenUser from '../page/Login/AuthenUser';
import Privacy from '../page/Privacy/Privacy';
import Portfolio from '../page/porfolio/Main';

const AppRoutes = (props) => {

    return (
        <>
            <Switch>
                <Route path='/login' exact component={AuthenUser}>
                </Route>
                <Route path="/" component={Portfolio}></Route>
                <Route path='/privacy'>
                <Privacy />
                </Route>
                <Route path='*'>
                    404 not found
                </Route>
            </Switch>
        </>
    )

}

export default AppRoutes;