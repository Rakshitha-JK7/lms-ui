import Header from "../student/components/header/header.jsx";
import AdminSidebar from "./components/sidebar/sidebar.jsx";
import HomePage from "./components/home_page/home_page.jsx";

const AdminDashboard = ()=>{
  return(
    <div>
      <Header/>
      <AdminSidebar/>
      <HomePage/>
    </div>
  );
}

export default AdminDashboard;

