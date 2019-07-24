import React from 'react';
import BabygrowthTable from './BabygrowthTable'
// import LineChart from './Chart'
import {Row} from 'reactstrap'
import BabygrowthGraph from "./BabygrowthGraph";

class Babygrowth extends React.Component{
  render(){
    return(
      <div>
        <Row>
        </Row>
        <Row className="mt-3">
            <BabygrowthGraph/>
            <BabygrowthTable/>
        </Row>
      </div>
    )
  }
}


export default Babygrowth
