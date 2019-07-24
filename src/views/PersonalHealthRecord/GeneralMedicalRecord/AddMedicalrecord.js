import React from "react";
import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import SubdocumentGMR from "./SubdocumentGMR";
import swal from "sweetalert";
import ButtonComponent from "../ButtonComponent";

const defaultDocument = {
  documentType: "",
  documentTitle: "",
  documentDescription: "",
  appointmentDate: "",
  files: ""
};

class AddMedicalrecord extends React.Component {
  state = {
    recordType: "",
    doctorName: "",
    hospitalName: "",

    newDoc: 0,
    documentType: "Prescription",
    title: "",
    description: "",
    appointmentDate: "",
    files: "",
    document: [defaultDocument]
  };

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  handledocChange = (e, id) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;
    let files = e.target.files;
    console.log(files);
    this.setState(prevState => ({
      document: prevState.document.map((doc, i) => {
        if (i === id) {
          if (type === "file") {
            return {
              ...doc,
              [name]: files
            };
          } else {
            return {
              ...doc,
              [name]: value
            };
          }
        } else {
          return doc;
        }
      })
    }));
  };

  handleClick = e => {
    console.log("clicked");
    console.log(this.state);
    const {
      recordType, doctorName,
      hospitalName, document
    } = this.state;
    console.log(this.state);
    const values = {
      recordType, doctorName,
      hospitalName
    }
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };

    const formdata = new FormData()
    for (let key in values){
      formdata.append(key,values[key])
    }
    for(let i=0; i<document.length; i++){
      for (let key in document[i]){
        if(key==="imageAndPdf"){
          for(let j=0; j<document[i][key].length; j++){
            formdata.append(key + i, document[i][key][j])
          }
        }
        else{
          formdata.append(key,document[i][key])
        }
      }
    }
    // axios.post(baseURL+`users/medicalrecord`,  formdata,  config)
    // .then((res)=>{
    //    console.log(res)
    //    toast.success('upload success')
    //  })
    //  .catch(err=>{
    //    console.log(err);
    //    toast.error('upload fail')
    //  })
  };

  addNewDocument = () => {
    if (this.state.newDoc >= 4) {
      swal("Warning !", "Maximum five document allowed !");
      return false;
    } else {
      this.setState(prvState => ({
        newDoc: prvState.newDoc + 1
      }));
      this.addDocument();
    }
  };

  addDocument = () => {
    this.setState(prevState => ({
      document: prevState.document.concat(defaultDocument)
    }));
  };

  renderNewDoxs = () => {
    let docs = [];
    for (let i = 0; i <= this.state.newDoc; i++) {
      docs.push(
        <SubdocumentGMR key={i} handleChange={this.handledocChange} id={i} />
      );
    }
    return docs;
  };

  removeNewDoc = () => {
    if (this.state.newDoc <= 0) return false;
    else {
      this.setState(prvState => ({
        newDoc: prvState.newDoc - 1
      }));
      this.removethisDoc();
    }
  };

  removethisDoc = () => {
    let index = this.state.document.length - 1;
    this.setState(prevState => ({
      document: prevState.document.filter((doc, i) => i !== index)
    }));
  };

  render() {
    // const { description, title } = this.state;
    return (
      <div className="mt-3">
        <Form className="card p-3">
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label for="healthRecord">Name of Health Record</Label>
                <Input type="text" />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label for="record">Types of Record</Label>
                <Input
                  type="select"
                  name="recordType"
                  onChange={this.handleChange}
                >
                  <option>Ultrasound Report</option>
                  <option>Prescription</option>
                  <option>Discharge Summary</option>
                  <option>Diagonostic Report</option>
                  <option>other</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label for="appointmentDate">Date of Appointment</Label>
                <Input
                  type="date"
                  name="appointmentDate"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label for="Doccter Name">Docter Name</Label>
                <Input
                  type="text"
                  name="doctorName"
                  placeholder="Full Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label for="phone">Phone No.</Label>
                <Input
                  type="text"
                  placeholder="Enter Hospital Clinic Phone No."
                  name="hospitalName"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12">
              <p>Document Details</p>
              <hr />
            </Col>
          </Row>
          {this.renderNewDoxs()}
          <div>
            <Button onClick={this.addNewDocument}>Add New Document</Button>
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
          </div>
        </Form>

        <div className="text-center mt-5 pb-5">
          <ButtonComponent handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default AddMedicalrecord;
