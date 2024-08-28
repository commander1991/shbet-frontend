import {
    Switch,
    Route
} from 'react-router-dom';
import Users from '../components/ManagerUsers/Users';
import PrivateRoutes from './PrivateRoutes';
import Role from "../components/Role/Role"
import GroupRole from '../components/GroupRole/GroupRole';
import Home from '../page/UserPage/Home';
import Dashboard from '../page/admin/Dashboard';
import Hui from '../page/UserPage/Hui';
import Transaction from '../components/Transaction/Transaction';
import Portfolio from '../page/porfolio/Main'
import AuthenUser from '../page/Login/AuthenUser';

const DevRoutes = (props) => {
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={Users} />
                <PrivateRoutes path="/roles" component={Role} />
                <PrivateRoutes path="/group-role" component={GroupRole} />
                <PrivateRoutes path="/admin" component={Dashboard} />
                <PrivateRoutes path="/hui" component={Hui} />
                <PrivateRoutes path="/home" component={Home} />
                <PrivateRoutes path="/transaction" component={Transaction} />
                
                <Route path="/" component={Portfolio}></Route>
                <Route path='*'>
                    404 not found
                </Route>
            </Switch>
        </>
    )

}

export default DevRoutes;