import {
    Switch,
    Route
} from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../page/admin/Dashboard';
import Hui from '../page/UserPage/Hui';
import Home from '../page/UserPage/Home';
import Transaction from '../components/Transaction/Transaction';
import AuthenUser from '../page/Login/AuthenUser';

const UserRoutes = (props) => {
    return (
        <>
            <Switch>
                <PrivateRoutes path="/admin" component={Dashboard} />
                <PrivateRoutes path="/hui" component={Hui} />
                <PrivateRoutes path="/home" component={Home} />
                <PrivateRoutes path="/transaction" component={Transaction} />

                <Route path='*'>
                    404 not found
                </Route>
            </Switch>
        </>
    )

}

export default UserRoutes;