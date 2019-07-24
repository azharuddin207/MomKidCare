import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SubDocument from "./SubDocument";
import ButtonComponent from "../../ButtonComponent";
import Axios from "axios";
import baseURL from "../../../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddThyroid extends React.Component {
  state = {
    testDate: "",
    T3: "",
    T4: "",
    labName: "",
    FT3: "",
    FT4: "",
    TSH: "",
    documentTitle: "",
    documentDescription: "",
    files: ""
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const files = e.target.files;
    if (type === "file") {
      this.setState({
        [name]: files
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  renderFileName = files => {
    let filename = [];
    for (let i = 0; i < files.length; i++) {
      filename.push(<ol key={i}>{files[i].name}</ol>);
    }
    return filename;
  };

  handleClick = () => {
    const {
      testDate,
      T3,
      T4,
      labName,
      FT3,
      FT4,
      TSH,
      documentTitle,
      documentDescription,
      files
    } = this.state;
    const data = {
      testDate,
      T3,
      T4,
      labName,
      FT3,
      FT4,
      TSH,
      documentTitle,
      documentDescription
    };
    // data.append("deseaseType", this.props.deseaseType)
    // console.log(this.props.deseaseType)
    // console.log(data)
    // console.log(files)
    if (data === null || files === undefined) {
      return false;
    }
    console.log(files)
    const formdata = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    formdata.append("deseaseType", this.props.deseaseType);
    for (let i = 0; i < files.length; i++) {
      formdata.append(files[i].name, files[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    console.log(formdata)
    Axios.post(baseURL + `users/thyroid`, formdata, config)
      .then(res => {
        console.log(res)
        toast.success("upload success");
      })
      .catch(err => {
        console.log(err);
        toast.error("upload fail");
      });
  };

  render() {
    const { files } = this.state;
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
                <Label for="t3">T3</Label>
                <Input
                  type="text"
                  name="T3"
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="t4">T4</Label>
                <Input
                  type="text"
                  name="T4"
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
                  name="labName"
                  placeholder="Enter Lab Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="ft3">FT3</Label>
                <Input
                  type="text"
                  name="FT3"
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="ft4">FT4</Label>
                <Input
                  type="text"
                  name="FT4"
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label for="tsh">TSH</Label>
                <Input
                  type="text"
                  name="TSH"
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <SubDocument
          handleChange={this.handleChange}
          renderFileName={this.renderFileName(files)}
        />
        <ButtonComponent handleClick={this.handleClick} />
      </div>
    );
  }
}

export default AddThyroid;
