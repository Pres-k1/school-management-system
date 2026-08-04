import man from "../../assets/man.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faQuestion} from '@fortawesome/free-solid-svg-icons';



function Topbar() {
  return(
       <div className="topbar">
                            <form action="">

                                <input type="text" placeholder="search exams, students or grades" />
                            </form>
                            <div>
                                <FontAwesomeIcon icon={faEnvelope} />
                               <FontAwesomeIcon icon={faBell} />
                               <FontAwesomeIcon icon={faQuestion}/>

                            </div>

                           <div className='top1'>

                             <div className='papboth'>
                              <p className='pap1'>Sir Mary Nakato</p>
                               <p className='pap2'>Headteacher</p>
                            </div>


                            <div className="image">
                                <img src={man} alt="" />
                            </div>
                           </div>
                        
        </div>
  )
}


export default Topbar;