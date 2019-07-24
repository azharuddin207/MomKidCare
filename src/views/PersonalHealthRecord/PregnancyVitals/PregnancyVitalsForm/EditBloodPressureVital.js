import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SubDocument from "./EditSubDocument";
import ButtonComponent from "../../ButtonComponent";
import Axios from "axios";
import baseURL from "../../../../config";
import "react-toastify/dist/ReactToastify.css";

class EditBloodPressureVital extends React.Component {
  state = {
    testDate: "",
    systolicBloodPressure: "",
    pulseRate: "",
    labName: "",
    diastolicBloodPressure: "",
    documentTitle: "",
    documentDescription: "",
    files: []
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const files = e.target.files;
    if (type === "file") {
      this.setState(prevState => ({
        bloodSugar: {
          ...prevState.bloodSugar,
          [name]: files
        }
      }));
    } else {
      this.setState(prevState => ({
        bloodSugar: {
          ...prevState.bloodSugar,
          [name]: value
        }
      }));
    }
  };

  handleClick = () => {
    console.log("hi");
    console.log(this.state);
  };

  componentDidMount() {
    let id = this.props.location.pathname.split("/")[2];
    Axios.get(baseURL + `users/bloodpressure/${id}`)
      .then(res => {
        console.log(res);
        const {
          testDate,
          systolicBloodPressure,
          pulseRate,
          labName,
          diastolicBloodPressure,
          documentTitle,
          documentDescription,
          files
        } = res.data.data;
        this.setState({
          testDate,
          systolicBloodPressure,
          pulseRate,
          labName,
          diastolicBloodPressure,
          documentTitle,
          documentDescription,
          files
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      testDate,
      systolicBloodPressure,
      pulseRate,
      labName,
      diastolicBloodPressure,
      documentTitle,
      documentDescription,
      files
    } = this.state;

    return (
      <div className="card p-4">
        <Form>
          <Row>
            <Col xs="12" className="col-md-4">
              <FormGroup>
                <Label for="dateandtime">Date and Time test</Label>
                <Input
                  type="date"
                  name="testDate"
                  value={testDate}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="t3">Systolic Blood Pressure</Label>
                <Input
                  type="text"
                  name="systolicBloodPressure"
                  value={systolicBloodPressure}
                  placeholder="in %"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="pulseRate">Pulse Rate</Label>
                <Input
                  type="text"
                  name="pulseRate"
                  placeholder="ng/dl"
                  value={pulseRate}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="col-md-4">
              <FormGroup>
                <Label for="labname">Lab Name</Label>
                <Input
                  type="text"
                  value={labName}
                  name="labName"
                  placeholder="Enter Lab Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="diastolicBloodPressure">
                  Diastolic Blood Pressure
                </Label>
                <Input
                  type="text"
                  value={diastolicBloodPressure}
                  name="diastolicBloodPressure"
                  placeholder="mg/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <SubDocument
          docdata={{ documentTitle, documentDescription, files }}
          handleChange={this.handleChange}
        />
        <ButtonComponent handleClick={this.handleClick} />
      </div>
    );
  }
}

export default EditBloodPressureVital;
