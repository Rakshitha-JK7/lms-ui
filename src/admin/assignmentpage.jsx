import Header from "../student/components/header/header.jsx";
import AdminSidebar from "./components/sidebar/sidebar.jsx";
import AdminAssignment from "./components/assignments/assignments.jsx";

const AdminAssignmentPage=()=>{
  return(
    <div>
      <Header/>
      <AdminSidebar/>
      <AdminAssignment/>
    </div>
  );
}

export default AdminAssignmentPage;