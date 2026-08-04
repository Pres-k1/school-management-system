function Recentmarks() {
  return(
    <div className="marksentry">

                               

                                <table>
                                    <thead>
                                        <h3>Recent Marks Entry</h3>
                                    </thead>
          

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
                                            <td className="g1">D1</td>
                                            <td>VERIFIED</td>
                                        </tr>

                                        <tr>
                                            <td>Sarah Atwine</td>
                                            <td>S.4 Blue</td>
                                            <td>English</td>
                                            <td>78</td>
                                            <td className="g2">C3</td>
                                            <td>PENDIND</td>
                                        </tr>

                                        <tr>
                                            <td>John Nsubuga</td>
                                            <td>S.2 East</td>
                                            <td>Physics</td>
                                            <td>64</td>
                                            <td >C5</td>
                                            <td>VERIFIED</td>
                                        </tr>
                                    </tbody>

                                </table>
    </div>

  )
}

export default Recentmarks;
