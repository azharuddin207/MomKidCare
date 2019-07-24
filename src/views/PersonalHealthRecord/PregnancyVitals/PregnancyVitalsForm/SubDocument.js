import React from "react";
import { Form, FormGroup, FormText, Label, Input, Col, Row } from "reactstrap";

const SubDocument = props => {
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
              onChange={props.handleChange}
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
              onChange={props.handleChange}
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
                onChange={props.handleChange}
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

export default SubDocument;
