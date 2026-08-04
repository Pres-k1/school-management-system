import Sidebar from "../components/examination/Sidebar";
import Topbar  from "../components/examination/Topbar";
import Overview from "../components/examination/Overview";
import Container from "../components/examination/Container";
import Lastpart from "../components/examination/Lastpart";
import Upcomingevents from "../components/examination/Upcomingevents";


function AcademicManagement() {
  return(
    <>
    <div className="partone">
        <Sidebar/>
        <div className="parttwo" >
            <Topbar/>
            <Overview/>

            <div className="partthree">
              <Container/>
              <Lastpart/>
            </div>

            <div>
              <Upcomingevents/>
            </div>


            
        </div>
        
    </div>


 </>

  )

  
 
}

export default AcademicManagement;