import React from 'react';
import Axios from "axios";
import {Table, Row, Col} from 'reactstrap'
import baseURL from "../../../config"
import ovulation from "../../../assets/img/healthTools/ovulation.png";
import HealthcalculatorBtn from "../HealthcalculatorBtn";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
class Ovulation extends React.Component{

  state = {
    data:[],
    errormsg:null,
    successmsg:null,
    loading:true
  }

  componentDidMount() {
    Axios.get(baseURL + `calculator/ovulation`)
      .then(res => {
        console.log(res.data.data)
        this.setState({
          data: res.data.data,
          loading: false,

        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }





  render(){
    let {data} = this.state
    console.log(data)
    if(this.state.loading) return <div>loading...</div>
    return(
      <React.Fragment>
        <Row>
          <Col md={{size : 4}} className="mt-5">
            <div>
              <img src={ovulation} alt={""} width="100%" />
            </div>
          </Col>
          <Col>
            <Table style={{  
              transition: "0.2s all ease",
              borderRadius: "4px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
              }}>
              <thead  className="tableHeader">
              <tr>
                <th>S.no</th>
                <th>Date of Finding</th>
                <th>Approx. Ovulation</th>
                <th>Fertile Window</th>
                <th>Next Period Start</th>
                <th>Monthly Average Cycle Length</th>
              </tr>
              </thead>
              {  data.length <= 0  ?
               <div  style={{ margin: "4em auto" , textAlign:"center"}}><h3>No Record Found</h3></div> :

              data.map((d, i)=>{
                return(
                  <tbody>
                  <tr>
                    <td>{i+1}</td>
                    <td>
                      {new Date(d.createdAt).getDate() +
                      "-" +
                      (new Date(d.createdAt).getMonth() +1)+
                      "-" +
                      new Date(d.createdAt).getFullYear()}
                    </td>
                    <td>
                      {
                        new Date(d.approxOvulation).getDate()+
                        "-"+
                        (new Date(d.approxOvulation).getMonth()+1)+
                        "-"+
                        new Date(d.approxOvulation).getFullYear()
                      }
                    </td>
                    <td>{
                      new Date(d.fertileStart).getDate() + " to " + new Date(d.fertileLast).getDate() + " "
                      +monthNames[new Date(d.fertileLast).getMonth()] + ", '"
                      +new Date(d.fertileLast).getFullYear().toString().substr(-2)
                    }</td>
                    <td>{
                      new Date(d.nextPeriodStart).getDate()+
                      "-"+(new Date(d.nextPeriodStart).getMonth()+1)+
                      "-"+
                      new Date(d.nextPeriodStart).getFullYear()
                    }</td>
                    <td>{d.avgCycleLength}</td>
                  </tr>
                  </tbody>
                )
              })}
            </Table>
          </Col>
        </Row>
        <HealthcalculatorBtn />
      </React.Fragment>
    );


  }

}

export default Ovulation

