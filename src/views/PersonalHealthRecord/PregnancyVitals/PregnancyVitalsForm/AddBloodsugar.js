import React from "react";
import { FormGroup, Label, Input, Row, Col, Form } from "reactstrap";
import SubDocument from "./SubDocument";
import ButtonComponent from "../../ButtonComponent";

class AddBloodsugar extends React.Component {
  state = {
    bloodSugar: {
      testDate: "",
      HbA1c: "",
      preMealBloodSugar: "",
      postMealBloodSugar: "",
      fUrineSugar: "",
      ppUrineSugar: "",
      description: "",
      title: ""
    }
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
                  name="testDate"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="t3">HbA1c</Label>
                <Input
                  type="text"
                  name="HbA1c"
                  placeholder="in %"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="Pre Meal Blood Sugar">Pre Meal Blood Sugar</Label>
                <Input
                  type="text"
                  name="preMealBloodSugar"
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
                <Label for="postMealBloodSugar">Post Meal Blood Sugar</Label>
                <Input
                  type="text"
                  name="postMealBloodSugar"
                  placeholder="mg/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="fUrineSugar">Urine Sugar</Label>
                <Input
                  type="text"
                  name="fUrineSugar"
                  placeholder="mg/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label for="ppUrineSugar">UrineSugar(pp)</Label>
                <Input
                  type="text"
                  name="ppUrineSugar"
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

export default AddBloodsugar;
