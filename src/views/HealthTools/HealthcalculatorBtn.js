import React from 'react';
import {Button} from 'reactstrap'

class HealthcalculatorBtn extends React.Component{
  render(){
    return(
        <div style={{margin:"0 auto"}} className="mt-5 pb-5 text-center">
          <Button className="healthCalculatorBtn">Go to Calculator</Button>
          <Button className="healthCalculatorBtn">Download PDF</Button>
        </div>
    );

  }
}


export default HealthcalculatorBtn