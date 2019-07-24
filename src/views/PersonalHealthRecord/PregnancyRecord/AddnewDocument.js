import React from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

class AddnewDocument extends React.Component{
  render(){
    let id= this.props.id;
    return(
      <div className="mt-5">
        <Form>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Type of Document(s)</Label>
                <Input type="select" name="documentType"
                       onChange={(e)=>this.props.onChangeDoc(e,id)}>
                  {this.props.options}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Title of Document(s)</Label>
                <Input type="text" placeholder="Enter Title"
                       name="title"
                       onChange={(e)=>this.props.onChangeDoc(e,id)}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" rows="5"
                       name="description"
                       onChange={(e)=> this.props.onChangeDoc(e,id)}/>
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Upload Document</Label>
                <br></br>
                <div>
                  <div className="upload-btn-wrapper">
                    <button className="btn">Upload</button>
                    <input type="file" name="imageAndPdf" multiple
                           onChange={(e)=>this.props.onChangeDoc(e,id)}/>
                  </div>
                  <div><ul>{this.props.filename}</ul></div>
                </div>
                <FormText color="muted">
                  Formats:JPEG, PNG, PDF only Size: 2MB per image.
                  4MB per pdf. maximum 4 images are allowed
                </FormText>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label for="lastLMP">
                  Date of Appointment/Test
                </Label>
                <Input type="date" name="appointmentDate"
                       onChange={(e)=> this.props.onChangeDoc(e,id)}
                >
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default AddnewDocument
