import Header from "../student/components/header/header.jsx";
import AdminSidebar from "./components/sidebar/sidebar.jsx";
import AdminCourse from "./components/courses/course_page.jsx";

const AdminCoursePage=()=>{
  return(
    <div>
      <Header/>
      <AdminSidebar/>
      <AdminCourse/>
    </div>
  );
}

export default AdminCoursePage;