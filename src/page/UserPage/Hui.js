import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";
import "./Hui.scss";
// import Widget from "../../components/widget/WidgetAdmin";
// import Featured from "../../components/featured/Featured";
import HuiTable from "../../components/HuiManage/HuiTable";

const UserActivities = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />        
        <div className="charts">
          <HuiTable />
        </div>
        <div className="listContainer">
          {/* <div className="listTitle">Latest Transactions</div> */}
        </div>
      </div>
    </div>
  )
};

export default UserActivities