function Pageheader(){
    return(
        <div className="pageheader">
            <h1>Examination Overview</h1>

            <div className="wrapper">
                <div className="examInfo">
                    <span>Term2, 2024 Academic Year  .</span>
                    <span className="active">Active season</span>
                </div>

                <div className="examBtns">
                    <button className="btn6">Exam Schdeule</button>
                    <button className="btn6">Generate Reports</button>
                    <button id="btn4">Enter Marks</button>
                </div>
                
            </div>
        </div>
    )
}

export default Pageheader;