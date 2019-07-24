import React from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Button
} from "reactstrap";
import {
  week0_6,
  week7_15,
  week16_27,
  week28_32,
  pre_pregnancyData,
  post_pregnancyData
} from "../selectedFielddata";
import AddnewDocument from "./AddnewDocument";
import swal from "sweetalert";
let options = [];

class AddForm extends React.Component {
  state = {
    newDoc: 0
  };

  addNewDocument = () => {
    if (this.state.newDoc >= 4) {
      swal("Warning !", "Maximum five document allowed !");
      return false;
    } else {
      this.setState(prvState => ({
        newDoc: prvState.newDoc + 1
      }));
      this.props.addDocument();
    }
  };

  removeNewDoc = () => {
    if (this.state.newDoc <= 0) return false;
    else {
      this.setState(prvState => ({
        newDoc: prvState.newDoc - 1
      }));
      this.props.removeDataFromArray();
    }
  };

  renderNewDoxs = (options, filename) => {
    let docs = [];
    for (let i = 0; i <= this.state.newDoc; i++) {
      docs.push(
        <AddnewDocument
          key={i}
          options={options}
          onChangeDoc={this.props.onChangeDoc}
          id={i}
          filename={filename}
        />
      );
    }
    return docs;
  };


  
  render() {
    const { pregnancyType, document, pregnancyStage } = this.props.state || {};
    let filename = [];
    for (let i = 0; i < document.length; i++) {
      let obj = { ...document[i] };
      let temp = [];
      temp = obj.imageAndPdf;
      for (let j = 0; j < temp.length; j++) {
        filename.push(<ol key={j}>{temp[j].name}</ol>);
      }
    }
    let pregnancyStageInput = "";
    pregnancyStageInput = (
      <Input type="select" name="pregnancyStage" onChange={this.props.onChange}>
        {/* <option>select...</option> */}
        <option>Normal pregnancy</option>
        <option>IVF/IUI</option>
        <option>Miscarriage</option>
        <option>Abortion</option>
        <option>Still birth</option>
        <option>Live birth with birth defects</option>
      </Input>
    );
    options = post_pregnancyData.map((item, i) => {
      return <option key={i}>{item}</option>;
    });

    if (
      pregnancyType &&
      pregnancyType === "Pre-Pregnancy (Trying to concieve)"
    ) {
      options = pre_pregnancyData.map((item, i) => {
        return <option key={i}>{item}</option>;
      });
      pregnancyStageInput = (
        <Input type="select" name="pregnancyStage" disabled />
      );
    }

    if (pregnancyType === "Current Pregnancy(Pregnant)") {
      pregnancyStageInput = (
        <Input
          type="select"
          name="pregnancyStage"
          onChange={this.props.onChange}
        >
          <option>select...</option>
          <option>0-6 Weeks</option>
          <option>7-15 Weeks</option>
          <option>16-27 Weeks</option>
          <option>28-32 Weeks</option>
          <option>33-Term Week</option>
          <option>Miscariage Week</option>
          <option>Abortion stage</option>
        </Input>
      );

      options = week0_6.map((item, i) => {
        return <option key={i}>{item}</option>;
      });
      if (pregnancyStage && pregnancyStage === "7-15 Weeks") {
        options = week7_15.map((item, i) => {
          return <option key={i}>{item}</option>;
        });
      }
      if (pregnancyStage && pregnancyStage === "16-27 Weeks") {
        options = week16_27.map((item, i) => {
          return <option key={i}>{item}</option>;
        });
      }
      if (pregnancyStage && pregnancyStage === "28-32 Weeks") {
        options = week28_32.map((item, i) => {
          return <option key={i}>{item}</option>;
        });
      }
      if (pregnancyStage && pregnancyStage === "33-Term Week") {
        options = week28_32.map((item, i) => {
          return <option key={i}>{item}</option>;
        });
      }
      if (pregnancyStage && pregnancyStage === "Miscariage Week") {
        options = week28_32.map((item, i) => {
          return <option key={i}>{item}</option>;
        });
      }
      if (pregnancyStage && pregnancyStage === "Abortion stage") {
        options = week28_32.map((item, i) => {
          return <option key={i}>{item}</option>;
        });
      }
    }

    return (
      <Card>
        <CardBody>
          <Row>
            <Col sm="12">
              <Row>
                <Col>
                  <Form className="mt-3" encType="multipart/form-data">
                    <Row form>
                      <Col xs="12" md={{ size: 4 }}>
                        <FormGroup>
                          <Label for="exampleSelectMulti">
                            Type of Pregnancy
                          </Label>
                          <Input
                            type="select"
                            name="pregnancyType"
                            onChange={this.props.onChange}
                          >
                            <option>Previous Pregnancy (History)</option>
                            <option>Pre-Pregnancy (Trying to concieve) </option>
                            <option>Current Pregnancy(Pregnant)</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col xs="12" md={{ size: 4 }}>
                        <FormGroup>
                          <Label for="lastLMP">
                            Enter Date of Last LMP(Last Menstrual Period)
                          </Label>
                          <Input
                            type="date"
                            name="lastMenstrualPeriodDate"
                            onChange={this.props.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md={{ size: 4 }}>
                        <FormGroup>
                          <Label for="pregnancyStage">Pregnancy Stage</Label>
                          {pregnancyStageInput}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row form>
                      <Col xs="12" md={{ size: 4 }}>
                        <FormGroup>
                          <Label for="exampleEmail">
                            Gynecologist Name<span className="asterisc">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="gynecologistName"
                            id="name"
                            placeholder="Full Name"
                            onChange={this.props.onChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md={{ size: 4 }}>
                        <FormGroup>
                          <Label for="hospitalName">
                            Hospital Name<span className="asterisc">*</span>
                          </Label>
                          <Input
                            required
                            type="text"
                            name="hospitalName"
                            placeholder="Name"
                            onChange={this.props.onChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md={{ size: 4 }}>
                        <FormGroup>
                          <Label for="phone">Phone No.</Label>
                          <Input
                            type="text"
                            placeholder="Enter Hospital/Clinic Phone Number"
                            name="phone"
                            onChange={this.props.onChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="col-md-1">
                        <p>Document Details</p>
                      </Col>
                      <Col className="col-md-11">
                        <hr />
                      </Col>
                    </Row>
                  </Form>

                  {this.renderNewDoxs(options, filename)}
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
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default AddForm;
