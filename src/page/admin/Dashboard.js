import Sidebar from "../../components/sidebar/SideBar";
import Navbar from "../../components/navbar/NavBar";
import "./Dashboard.scss";
//import Widget from "../../components/widget/WidgetAdmin";
//import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";

const AdminDashboard = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <p>Admin</p>
          {/* <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        <div className="charts">
          {/* <Featured /> */}
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>

        </div>
      </div>
    </div>
  )
};

export default AdminDashboard;