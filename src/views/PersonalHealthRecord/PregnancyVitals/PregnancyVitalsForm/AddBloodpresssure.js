import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SubDocument from "./SubDocument";
import ButtonComponent from "../../ButtonComponent";

class AddPregnancyvitalsBloodpressure extends React.Component {
  state = {
    testDate: "",
    systolicBloodPressure: "",
    pulseRate: "",
    labName: "",
    diastolicBloodPressure: "",
    documentTitle: "",
    documentDescription: ""
  };

  handleClick = () => {
    console.log("hi");
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <Form className="card p-3">
          <Row>
            <Col xs="12" className="col-md-4">
              <FormGroup>
                <Label for="dateandtime">Date and Time test</Label>
                <Input
                  type="date"
                  name="thyroid"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="t3">Blood Pressure(systolic)</Label>
                <Input
                  type="text"
                  name="systolicBloodPressure"
                  placeholder="in %"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="Pre Meal Blood Sugar">Pulse Rate</Label>
                <Input
                  type="text"
                  name="pulseRate"
                  placeholder="ng/dl"
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
                  name="thyroid"
                  placeholder="Enter Lab Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="postMealBloodSugar">
                  Blood Pressure(Diastolic)
                </Label>
                <Input
                  type="text"
                  name="diastolicBloodPressure"
                  placeholder="mg/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <SubDocument handleChange={this.handleChange} />
        <ButtonComponent handleClick={this.handleClick} />
      </div>
    );
  }
}

export default AddPregnancyvitalsBloodpressure;
