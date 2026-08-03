function Paperprogress() {
  return(
   <div className="exam">

                                <div className="Info">
                                    <h3>Exam Paper Progress</h3>
                                    <p><a href="">View all</a></p>
                                </div>

                                <div className="progress" >
                                    <div className="prog">
                                        <div className="progressInfo">
                                            <p> Marking Ready</p>
                                            <p>84%</p>
                                        </div>
                                        <div className="progressBar">
                                            <div className="bar1"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress" >
                                    <div className="prog">
                                        <div className="progressInfo">
                                            <p> In Progress</p>
                                            <p>12%</p>
                                        </div>
                                        <div className="progressBar">
                                            <div className="bar2"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="progress" >
                                    <div className="prog">
                                        <div className="progressInfo">
                                            <p> Marked and Verified</p>
                                            <p>65%</p>
                                        </div>
                                        <div className="progressBar">
                                            <div className="bar3"></div>
                                        </div>
                                    </div>
                                </div>



                            
    </div>

  )

  

  
 
}

export default Paperprogress;