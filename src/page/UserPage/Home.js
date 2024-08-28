import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";
import "./Home.scss";
import WidgetAdmin from "../../components/widget/WidgetAdmin";
import WidgetUser from "../../components/widget/WidgetUser";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import { useContext } from "react";
import { UserContext } from '../../context/UserContext';
import HuiManager from "../../components/HuiManage/HuiCRUD/PHUI";

const Home = () => {
  const { user } = useContext(UserContext)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          {user.account.groupWithRoles.id === 1 ?
            <>
              <WidgetAdmin type="user" />
              <WidgetAdmin type="order" />
              <WidgetAdmin type="earning" />
              <WidgetAdmin type="balance" />
            </>
            :
            <>
              <WidgetUser type="order" />
              <WidgetUser type="earning" />
              <WidgetUser type="balance" />
            </>
          }
        </div>
        <div className="charts">
          {user.account.groupWithRoles.id === 1
            ?
            <HuiManager />
            :
            <>User page</>
          }

        </div>
        <div className="listContainer">
          {/* <div className="listTitle">Latest Transactions</div> */}

        </div>
      </div>
    </div>
  )

};

export default Home