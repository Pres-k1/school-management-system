import React from 'react';
import { useState } from 'react';

function Trend() {
   const [count, setCount] = useState(0); 

  return (
    
 <div className="yeartrend">
   <div >
      <h3>Year Trend</h3>
      <p>Overall performance has increased by 8.4% compared to term 1</p>
    </div>

    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
 </div>  
    



  );
}

export default Trend;