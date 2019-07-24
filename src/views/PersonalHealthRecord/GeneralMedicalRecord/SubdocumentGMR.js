import React from "react";
import { Form, FormGroup, FormText, Label, Input, Col, Row } from "reactstrap";

const SubdocumentGMR = props => {
  console.log(props)
  let id = props.id
  console.log(id)
  return (
    <Form>
      <Row>
        <Col xs="12" md={{ size: 4 }}>
          <FormGroup>
            <Label>Title of Document(s)</Label>
            <Input
              type="text"
              placeholder="Enter Title"
              name="documentTitle"
              onChange={(e) => props.handleChange(e, id)}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md={{ size: 4 }}>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              rows="5"
              name="documentDescription"
              onChange={(e) => props.handleChange(e, id)}
            />
          </FormGroup>
        </Col>
        <Col xs="12" md={{ size: 4 }}>
          <FormGroup>
            <Label>Upload Document</Label>
            <br />
            <div className="upload-btn-wrapper">
              <button className="uploadBtn"> Upload</button>
              <input
                type="file"
                name="files"
                multiple
                onChange={(e) => props.handleChange(e, id)}
              />
            </div>
            <FormText color="muted">
              Formats:JPEG, PNG, PDF only Size: 2MB per image. 4MB per pdf.
              maximum 4 images are allowed
            </FormText>
            <div>
              <ul>{props.renderFileName}</ul>
            </div>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default SubdocumentGMR;
