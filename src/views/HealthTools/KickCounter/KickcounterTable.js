import React from 'react'
import { Table } from 'reactstrap';


class KickcounterTable extends React.Component{
  render(){
    return(
      <Table frame="box"> 
      <thead>
        <tr>
          <th>S.No</th>
          <th>Start</th>
          <th>Duration</th>
          <th>Total Kicks</th>
        </tr>
      </thead>

    {this.props.subdata.map((d, i)=>{
        return(
          <tbody key={i}>
              <tr key={i}>
                <td>{i+1}</td>
                <td>{d.startTime}</td>
                <td>{d.duration}</td>
                <td>{d.kicks}</td>
              </tr>
          </tbody>
        );
    })} 
    </Table>
    );
  }
}


export default KickcounterTable