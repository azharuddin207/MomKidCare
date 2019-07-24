import React from "react";
// import AddMedicalrecord from "./AddMedicalrecord";
// import {Table, Row, Card, CardBody, Col, Button} from 'reactstrap'
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Row,
  Col
} from "reactstrap";

class ViewMedicalrecord extends React.Component {
  state = {
    activeTab: "1"
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" lg="12" style={{ margin: 0, padding: 0 }}>
            {/* <Card className="PregnancyRecordCard">
                  <CardBody> */}
            <Table responsive>
              <thead style={{ background: "#0BA0FA", color: "#ffffff" }}>
              <tr>
                <th>S.No</th>
                <th>Date of Appointment</th>
                <th>Hospital/Clinic</th>
                <th>Doctor Name</th>
                <th>Types of Document(s)</th>
                <th>Title of Document(s)</th>
                <th>File Uploaded</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>1</td>
                <td>20-06-19</td>
                <td>AIIMS Delhi</td>
                <td>Dr. Rajiv Bhatiya</td>
                <td>pdf</td>
                <td>My Reports</td>
                <td>reports.pdf</td>
                <td>
                  <div className="row">
                    <i className="shareRecord   fa fa-share  col-3" />
                    <i className="editRecord      fa fa-pencil col-3" />
                    <i className="downloadRecord   fa fa-download  col-3" />
                    <i className="deleteRecord     fa fa-trash  col-3" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>20-06-19</td>
                <td>AIIMS Delhi</td>
                <td>Dr. Rajiv Bhatiya</td>
                <td>pdf</td>
                <td>My Reports</td>
                <td>reports.pdf</td>
                <td>
                  <div className="row">
                    <i className="shareRecord   fa fa-share  col-3" />
                    <i className="editRecord      fa fa-pencil col-3" />
                    <i className="downloadRecord   fa fa-download  col-3" />
                    <i className="deleteRecord     fa fa-trash  col-3" />
                  </div>
                </td>
              </tr>
              </tbody>
            </Table>

            <div className="text-center mt-4">
              <Button
                className="btn text-center "
                tag={Link}
                to={"/addgeneralmedicalrecord"}
              >
                <i className="fa fa-plus-circle mr-2" /> Add New Record
              </Button>
            </div>
            <br></br>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewMedicalrecord;
