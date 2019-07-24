import React from "react";
import {
// Table,
  Card,
  CardBody,
  ListGroup,
} from "reactstrap";
import sad from "../../../assets/img/common/sad.png";
import Axios from "axios";
import kickcounter from "../../../assets/img/healthTools/ill.png";
import CounterCollapse from './CounterCollapse'
import HealthcalculatorBtn from "../HealthcalculatorBtn";
import baseURL from "../../.././config";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
// require("bootstrap/less/bootstrap.less");
const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;
class KickCounter extends React.Component {
  state = {
    collapse: null,
    loading: true,
    kickcounterData: [],
    successmsg: "",
    errormsg: "",
    avgKicks: 0,
    id: ""
  };




  toggleCollapse = (id) => {
    if(this.state.collapse === id){
      this.setState({collapse:null})
    }
    else{
      this.setState({collapse: id})
    }
  }



  componentDidMount() {
    Axios.get(baseURL + `calculator/kickcount`)
      .then(res => {
        this.setState({
          kickcounterData: res.data.data,
          loading: false,
          successmsg: res.data.message
        });
      })
      .catch(err => {
        this.setState({ errormsg: err.message, loading: false });
        console.log(err);
      });
  }

  totalKicks = subdata => {
    return subdata.reduce((totalKicks, kick) => totalKicks + kick.kicks, 0);
  };

  avgKicks = kickcounterData => {
    let totalKicks = kickcounterData.map(data => {
      return this.totalKicks(data.subdata);
    });
    let sum = totalKicks.reduce((sum, i) => sum + i, 0);
    let avg = sum / totalKicks.length;
    return avg;
  };

  render() {
    const { kickcounterData, errormsg, successmsg } = this.state;
    if (this.state.loading) {
      return (
        <div
          className="sweet-loading text-center"
          style={{ marginTop: "150px" }}
        >
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={80}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }

    if (successmsg && !errormsg) {
      return (
        <div>
          <div className="row">
            <div className="col-md-5">
              <p className="text-center"
                 style={{
                   position: "absolute",
                   // left: "46.5%",
                   fontWeight: 700,
                   bottom: "6em",
                   color: "white",
                   top: "55%",
                   left: "46.5%",
                   transform: "translate(-50%, -50%)"
                 }}
              >
                {Math.round(this.avgKicks(kickcounterData))}
              </p>
              <img src={kickcounter} width="100%" alt=""/>
            </div>

            <div className="col-md-7">
              <Card>
                <CardBody>
                  <ListGroup>
                    {kickcounterData.map((data, i) => {
                      return (
                        <CounterCollapse
                          data={data}
                          key={i}
                          totalKicks={this.totalKicks}
                          index={i}
                          toggle={() => this.toggleCollapse(i)}
                          isActive={this.state.collapse === i ? true : false}
                        />
                      )
                    })}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </div>
          <HealthcalculatorBtn />
        </div>
      );
    }

    if (!successmsg && errormsg) {
      return (
        <div className="text-center" style={{ margin: "10em auto" }}>
          <p style={{ color: "#535771" }}>
            <img src={sad} className="mb-4" alt="" />
            {errormsg}
          </p>
        </div>
      );
    }
  }
}

export default KickCounter;
