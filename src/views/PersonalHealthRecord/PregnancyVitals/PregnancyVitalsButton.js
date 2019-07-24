import React from 'react';
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
// import AddPregnancyVitals from './PregnancyVitalsForm/AddPregnancyvitals'

class PregnancyVitalsButton extends React.Component{
  render(){
    return(
        <div style={{margin:"0 auto"}} className="mt-5 pb-5 text-center">
          <Button tag={Link} to={'/AddPregnancyVitals'} className="healthCalculatorBtn">Add New Record</Button>
          <Button className="healthCalculatorBtn">Download PDF</Button>
        </div>
    );

  }
}


export default PregnancyVitalsButton