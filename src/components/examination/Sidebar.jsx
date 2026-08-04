function Sidebar() {
    return (
        < div className="sidebar" >
            {/* FIRST CONTAINER */ }
            <div>
                <h1>PSMS</h1>
                <p className="subtitle">Super Admin Portal</p>

                <div className="menuitems">
                    <div className="icons">
                        <a href="">Dashboard</a>
                    </div>

                    <div className="icons">
                        <a href="">Admissions</a>
                    </div>

                    <div className="icons">
                        <a href="">Students</a>
                    </div>

                    <div className="icons">
                        <a href="">Teachers</a>
                    </div>

                    <div className="icons">
                        <a href="" className="vertical">Examinations</a>
                    </div>

                    <div className="icons">
                        <a href="">Report cards</a>
                    </div>

                    <div className="icons">
                        <a href="">School Fees</a>
                    </div>
                    
                    <div className="icons">
                        <a href="">Library</a>
                    </div>
                </div>

                <div className="sidebar33">
                    <div className="btn77">
                        <button >+ New admissions</button>
                    </div>
                    <p>Settings</p>
                    <p className="ppp">Logout</p>
                </div>
            </div>
            </div >
            


  )
}

export default Sidebar;
