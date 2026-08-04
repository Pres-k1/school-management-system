import Paperprogress from "./Paperprogress";
import Subjectaverage from "./Subjectaverage";
import Recentmarks from "./Recentmarks";



function Container() {
  return(
    <div className="Container">
     
     <div className="cont1">
        <Paperprogress/>
        <Subjectaverage/>
     </div>

     <div>
        <Recentmarks/>
        

     </div>
            

    </div>

    
    

  )

  
 
}

export default Container;