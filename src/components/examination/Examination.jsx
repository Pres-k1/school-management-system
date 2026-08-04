function Examination() {
    return (
        <div className="maincontent">


            {/* FIRST CONTAINER */}
            <div className="sidebar">

                <div>
                    <h1>PSMS</h1>
                    <p>Super Admin Portal</p>

                    <div>
                        <a href="">Dashboard</a>
                        <a href="">Admissions</a>
                        <a href="">Students</a>
                        <a href="">Teachers</a>
                        <a href="">Examinations</a>
                        <a href="">Report cards</a>
                        <a href="">School Fees</a>
                        <a href="">Library</a>
                    </div>

                    <div>
                        <p className="newadmission"> <a href="">+ New admissions</a></p>
                        <p>Settings</p>
                        <p>Logout</p>
                    </div>

                    
                </div>


                    {/*  SECOND CONTAINER  */}
                    <div className="mainnavbar">

                        {/* TOP BAR */}
                        <div className="topbar">
                            <form action="">

                                <input type="text" placeholder="search exams, students or grades" />
                            </form>

                            <div>
                                <p>Sir Mary Nakato</p>
                                <p>Headteacher</p>
                            </div>
                        </div>

                        {/*  PAGE HEADER  */}
                        <div className="pageheader">

                            <h1>Examination Overview</h1>
                            <p> Term 2, 2024 Aacademic Year</p>

                            <div className="active">
                                <p>Active Season</p>
                            </div>

                            <div>
                                <p>Exam Schedule</p>
                            </div>

                            <div>
                                <p>Generate Reports</p>
                            </div>

                            <div className="entermarks">
                                <p>enter marks</p>
                            </div>

                        </div>

                        {/*  KPIS  */}
                        <div className="KPIS">

                            <div className="cards">
                                <h3>TOTAL STUDENTS</h3>
                                <p>2450</p>
                            </div>

                            <div className="cards">
                                <h3>AVERAGE GRADE</h3>
                                <p>B+</p>
                            </div>

                            <div className="cards">
                                <h3>COMPLETION STATUS</h3>
                                <p>42/50</p>
                                <p>Exams</p>
                            </div>

                            <div className="cards">
                                <h3>TOP PERFORMING</h3>
                                <p>Senior 4</p>
                            </div>
                        </div>

                        {/* left div */}
                        <div className="leftdiv">

                            {/* exam paper progress */}
                            <div className="exam">

                                <div>
                                    <h3>Exam Paper Progress</h3>
                                    <p><a href="">View all</a></p>
                                </div>

                                <div className="progress" >
                                    <p> Marking Ready       84%</p>
                                    <p>In Progress          12%</p>
                                    <p> Marked & Verified   65%</p>
                                </div>

                            </div>

                            {/* subject average */}
                            <div className="subject">

                                <div>
                                    <h3>Subject Average</h3>
                                </div>

                                <div className="subjects">
                                    <p>MATH  ENG  SCI  SST</p>

                                </div>

                            </div>

                            {/* recent marks entry  */}
                            <div className="marksentry">

                                <h3> Recent Marks Entry</h3>

                                <table>

                                    <tbody>
                                        <tr>
                                            <th>STUDENT NAME</th>
                                            <th>CLASS</th>
                                            <th>SUBJECT</th>
                                            <th>SCORE</th>
                                            <th>GRADE</th>
                                            <th>STATUS</th>
                                        </tr>

                                        <tr>
                                            <td>Kato Moses</td>
                                            <td>P.7 West</td>
                                            <td>Mathematics</td>
                                            <td>92</td>
                                            <td>D1</td>
                                            <td>VERIFIED</td>
                                        </tr>

                                        <tr>
                                            <td>Sarah Atwine</td>
                                            <td>S.4 Blue</td>
                                            <td>English</td>
                                            <td>78</td>
                                            <td>C3</td>
                                            <td>PENDIND</td>
                                        </tr>

                                        <tr>
                                            <td>John Nsubuga</td>
                                            <td>S.2 East</td>
                                            <td>Physics</td>
                                            <td>64</td>
                                            <td>C5</td>
                                            <td>VERIFIED</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>



                        </div>

                        {/* right div */}
                        <div className="rightdiv">

                            {/* upcoming exams */}
                            <div className="upcomingexams">
                                <h2>Upcoming Exams</h2>

                                {/* date 1 */}
                                <div id="DATE">
                                    <p>OCT 24</p>
                                </div>

                                <div>
                                    <p>P.L.E MOCK II</p>
                                    <p>09:00AM . Main Hall</p>

                                    <div className="button">
                                        <p>compulsory</p>
                                    </div>
                                </div>

                                {/* date 2  */}
                                <div className="DATE">
                                    <p>OCT 26</p>
                                </div>

                                <div>
                                    <p>U.C.E Physics Practicals</p>
                                    <p>02:00AM Lab A</p>

                                    <div className="button">
                                        <p>sciences</p>
                                    </div>

                                </div>

                                {/* date 3 */}
                                <div className="DATE">
                                    <p>OCT 29</p>
                                </div>

                                <div>
                                    <p>Fine Art Drawing</p>
                                    <p>08:30AM . Art Studio</p>
                                </div>

                                <div className="button">
                                    <p>Elective</p>
                                </div>

                                <div>
                                    <button> View Calendar</button>
                                </div>


                            </div>

                            {/*  exam invigilation */}
                            <div className="Examinvig">
                                <h3>Exam Invigilation</h3>

                                <div>
                                    <p className="p1">Mr Okello David</p>
                                    <p className="p2">Mathematics . P.7 West</p>
                                </div>

                                <div>
                                    <p className="p1">Ms.Namubiru Janet</p>
                                    <p className="p2">English . S.4 Blue</p>
                                </div>

                            </div>

                            {/*  year trend */}

                            <div className="yeartrend">
                                <h3>Year Trend</h3>
                                <p> Overall performance has increased by 8.4% compared to term 1</p>
                            </div>


                            {/*upcoming events  */}

                            <div className="upcomingevents">
                                <div className="staff">
                                    <div id="term">
                                    <p> MAY 22</p>
                                    </div>

                                    <div className="ceremony">
                                        <p>Term 11 Opening Ceremony</p>
                                        <p>08:00AM -School Grounds</p>
                                        <p>+12</p>

                                    </div>

                                </div>

                                <div className="staff">
                                    <div id="term">
                                    <p>MAY 25</p>
                                    </div>

                                    <div className="ceremony">
                                        <p>Staff Meeting</p>
                                        <p>03:30AM -Main Hall</p>
                                        <p>Block A, Room 302</p>

                                    </div>

                                </div>
                                

                                

                                <div className="eventBtn">
                                    <button> + Add New Event</button>
                                </div>

                            </div>
                        </div>

                    </div>

                







            </div>
            
            
        </div>    
        
    )

  
 
}

            export default Examination;