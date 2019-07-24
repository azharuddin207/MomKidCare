import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
  Table,
  Input
} from "reactstrap";
import "./style.css"
// const records = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" }
// ];

class ViewSharemyrecord extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="pt-3">
        <Form>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Share With</Label>
                <Input
                  value={selectedOption}
                  type="select"
                  name="contact"
                  onChange={this.handleChange}
                >
                  <option>Thyroid</option>
                  <option>Blood Sugar</option>
                  <option>Blood Pressure</option>
                </Input>
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <Button
                className=""
                style={{ marginTop: "30px" }}
                tag={Link}
                to={"/profile"}
              >
                Add Contact
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className="col-md-12">
              <p>Select Record</p>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 4 }}>
              <Label>Record Type</Label>

              <Input
                value={selectedOption}
                type="select"
                name="recordtype"
                onChange={this.handleChange}
              >
                <option>Thyroid</option>
                <option>Blood Sugar</option>
                <option>Blood Pressure</option>
              </Input>
            </Col>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label>Search</Label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Title or Hospital..."
                  />
                  <div className="input-group-append">
                    <button color="secondary" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Table>
              <thead>
              <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Date</th>
                <th>Hospital</th>
                <th>Doctor</th>
                <th>Select</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>Reports</td>
                <td>26-06-18</td>
                <td>Max Hospital</td>
                <td>Rajeev Shukla</td>
                <td>
                  <input type="radio" />
                </td>
              </tr>
              </tbody>
            </Table>
          </Row>
          <Row className="mt-5">
            <Col xs="12" md={{ size: 5 }}>
              <Label>Type your message here</Label>
              <Input type="textarea" placeholder="" rows="5" />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default ViewSharemyrecord;
