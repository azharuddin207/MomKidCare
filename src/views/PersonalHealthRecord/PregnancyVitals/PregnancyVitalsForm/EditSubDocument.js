import React from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Table,
  Card
} from "reactstrap";

const EditSubDocument = props => {
  const files = props.docdata.files;
  return (
    <Form>
      <h6>
        Document Details
        <hr/>
      </h6>
      <Row>
        <Col xs="12" md={{ size: 4 }}>
          <FormGroup>
            <Label>Title of Document(s)</Label>
            <Input
              type="text"
              placeholder="Enter Title"
              name="documentTitle"
              value={props.docdata.documentTitle}
              onChange={props.handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              rows="5"
              name="documentDescription"
              value={props.docdata.documentDescription}
              onChange={props.handleChange}
            />
          </FormGroup>
        </Col>

        <Col xs="12" md={{ size: 4 }}>
          <FormGroup>
            <Label>Documents</Label>
            <br />
            <Card>
              <Table>
                <thead>
                <tr>
                  <th>File</th>
                  <th>Replace File</th>
                </tr>
                </thead>
                <tbody>
                {files.map((file, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a href={file.link} download target="_blank">
                          Link
                        </a>
                      </td>
                      <td>
                        <div className="upload-btn-wrapper">
                          <button className="btn btn-secondary mb-2"> Replace</button>
                          <input
                            type="file"
                            name="files"
                            multiple
                            onChange={props.handleChange}
                          />
                        </div>
                        <div>
                          <ul>{props.renderFileName}</ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </Table>
            </Card>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default EditSubDocument;
