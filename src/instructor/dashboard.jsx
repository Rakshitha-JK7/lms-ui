import Header from "../student/components/header/header";
import InstructorSidebar from "./components/sidebar/sidebar.jsx";
import InstructorHomePage from "./components/home/home.jsx"

const InstructorDashboard = ()=>{
  return(
    <div>
      <Header/>
      <InstructorSidebar/>
      <InstructorHomePage/>
    </div>
  );
}

export default InstructorDashboard;