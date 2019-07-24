import React from "react";
import { Form, Label, Col, Input, FormGroup, Button, Row } from "reactstrap";
import ButtonComponent from "../ButtonComponent";
import SubChildDocument from "./SubChildDocument";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class AddChildrecord extends React.Component {
  state = {
    title: "",
    description: "",
    newDoc: 0
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderNewDoxs = () => {
    let docs = [];
    for (let i = 0; i <= this.state.newDoc; i++) {
      docs.push(<SubChildDocument key={i} />);
    }
    return docs;
  };

  // addDocument = () => {
  //   this.setState(prevState => ({
  //     document: prevState.document.concat(defaultDocument)
  //   }));
  // }

  addNewDocument = () => {
    if (this.state.newDoc >= 4) {
      swal("Warning !", "Maximum five document allowed !");
      return false;
    } else {
      this.setState(prvState => ({
        newDoc: prvState.newDoc + 1
      }));
      // this.addDocument();
    }
  };

  removeNewDoc = () => {
    if (this.state.newDoc <= 0) return false;
    else {
      this.setState(prvState => ({
        newDoc: prvState.newDoc - 1
      }));
      // this.props.removeDocFromArray();
    }
  };

  render() {
    // const {title, description} = this.state;
    return (
      <div className="card p-4">
        <Form>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Select Child</Label>
                <Input type="select">
                  <option>Child Records - Type of Documents</option>
                  <option>Blood Reports</option>
                  <option>Ultrasound Reports</option>
                  <option>X-Ray Reports</option>
                  <option>Procedure/Surgeries/ Discharge Summary</option>
                  <option>Child Assessment/Therapy Charts</option>
                  <option>Any Other Report</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 3 }}>
              <Button
                tag={Link}
                to={"/profile"}
                style={{ marginTop: "20px", radius: "64px" }}
              >
                Add Child
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Docter Name</Label>
                <Input type="text" placeholder="Full Name" />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Hospital Name</Label>
                <Input type="text" placeholder="Name" />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Phone No.</Label>
                <Input
                  type="text"
                  placeholder="Enter Hospital/Clinic phone No."
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Name of Issue/Therepy </Label>
                <Input type="text" placeholder="Write here" />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Date of Appointment/Test</Label>
                <Input type="date" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-2">
              <p>Document Details</p>
            </Col>
            <Col className="col-md-10">
              <hr />
            </Col>
          </Row>
          {this.renderNewDoxs()}
          <div className="clearfix" />
          <Button onClick={() => this.addNewDocument()}>
            Add New Document
          </Button>
          {this.state.newDoc !== 0 ? (
            <Button
              style={{ backgroundColor: "rgb(220,20,60)" }}
              onClick={() => this.removeNewDoc(this.state.newDoc)}
            >
              Remove
            </Button>
          ) : (
            <div />
          )}
        </Form>
        <div className="text-center mt-5 pb-5">
          <ButtonComponent
            clickHandler={this.clickHandler}
            handleDiscard={this.handleDiscard}
          />
        </div>
      </div>
    );
  }
}

export default AddChildrecord;
