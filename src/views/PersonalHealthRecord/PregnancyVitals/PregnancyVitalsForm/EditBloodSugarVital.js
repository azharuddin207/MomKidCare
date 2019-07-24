import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SubDocument from "./EditSubDocument";
import ButtonComponent from "../../ButtonComponent";
import Axios from "axios";
import baseURL from "../../../../config";
import "react-toastify/dist/ReactToastify.css";

class EditBloodSugarVital extends React.Component {
  state = {
    bloodSugar: {
      testDate: "",
      HbA1c: "",
      preMealBloodSugar: "",
      postMealBloodSugar: "",
      fUrineSugar: "",
      ppUrineSugar: "",
      documentDescription: "",
      documentTitle: "",
      files: []
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

  componentDidMount() {
    let id = this.props.location.pathname.split("/")[2];
    Axios.get(baseURL + `users/bloodsugar/${id}`)
      .then(res => {
        console.log(res);
        const {
          testDate,
          HbA1c,
          preMealBloodSugar,
          postMealBloodSugar,
          fUrineSugar,
          ppUrineSugar,
          documentDescription,
          documentTitle,
          files
        } = res.data.data;
        this.setState({
          bloodSugar: {
            testDate,
            HbA1c,
            preMealBloodSugar,
            postMealBloodSugar,
            fUrineSugar,
            ppUrineSugar,
            documentDescription,
            documentTitle,
            files
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      testDate,
      HbA1c,
      preMealBloodSugar,
      postMealBloodSugar,
      fUrineSugar,
      ppUrineSugar,
      documentDescription,
      documentTitle,
      files
    } = this.state.bloodSugar;

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
                <Label for="t3">HbA1c</Label>
                <Input
                  type="text"
                  name="HbA1c"
                  value={HbA1c}
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
                  value={preMealBloodSugar}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col xs="12" className="col-md-4">
              <FormGroup>
                <Label for="labname">Lab Name</Label>
                <Input
                  type="text"
                  value={labName}
                  name="thyroid"
                  placeholder="Enter Lab Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col> */}
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="postMealBloodSugar">Post Meal Blood Sugar</Label>
                <Input
                  type="text"
                  value={postMealBloodSugar}
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
                  value={fUrineSugar}
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
                  value={ppUrineSugar}
                  type="text"
                  name="ppUrineSugar"
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

export default EditBloodSugarVital;
