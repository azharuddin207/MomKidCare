import React from "react";
import ViewThyroid from "./ViewThyroid";
import ViewBloodPressure from "./ViewBloodPressure";
import ViewBloodSugar from "./ViewBloodSugar";

// import AddPregnancyVitals from '../PregnancyVitalsForm/AddPregnancyVitals';
import {Button, Form, FormGroup, Input} from "reactstrap";
import {Link} from "react-router-dom";
class ViewPregnancyVitals extends React.Component {
  state = {
    deseaseType: "Thyroid"
  };

  changeHandler = e => {
    let value = e.target.value;
    this.setState({ deseaseType: value });
  };

  renderComponent = () => {
    let deseaseType = this.state.deseaseType;
    if (deseaseType === "Thyroid") {
      return <ViewThyroid />;
    }
    if (deseaseType === "Blood Sugar") {
      return <ViewBloodSugar />;
    }
    if (deseaseType === "Blood Pressure") {
      return <ViewBloodPressure />;
    }
  };

  render() {
    return (
      <div>
        <Form className="row mt-2">
          <FormGroup className="col-3">
            <Input
              type="select"
              style={{ borderLeft: "4px solid #62c2de" }}
              name="deseaseType"
              onChange={this.changeHandler}
            >
              <option>Thyroid</option>
              <option>Blood Sugar</option>
              <option>Blood Pressure</option>
            </Input>
          </FormGroup>
        </Form>
        {this.renderComponent()}
        {/* <ViewPregnancyVitalsThyroid />
        <PregnancyVitalsButton /> */}
        <div className="text-center mt-4">
          <Button
            className="btn text-center "
            tag={Link}
            to={"/addpregnancyvitals"}
          >
            <i className="fa fa-plus-circle mr-2" /> Add New Record
          </Button>
        </div>
      </div>
    );
  }
}

export default ViewPregnancyVitals;
