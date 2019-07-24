import React from "react";
import MyProfile from './MyProfile';
import {
  // Nav,
  // NavItem,
  // NavLink,
  Card,
  Button,
  // CardTitle,
  // CardText,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  // FormText,
  CardBody
} from "reactstrap";
// import { Link } from "react-router-dom";
import "./Account.css";

class Profile extends React.Component {
  render() {
    return (
      <div className="mt-4 account-edit">
        <MyProfile/>
        <Card className="account-card">
          <CardBody>
            <Form>
              <Row>
                <Col md={{ size: 4 }}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      name="fullname"
                      placeholder="Full Name"
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <Label>Gender</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="inline-radio1"
                          name="inline-radios"
                          value="option1"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="inline-radio1"
                        >
                          Male
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="inline-radio2"
                          name="inline-radios"
                          value="option2"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="inline-radio2"
                        >
                          Female
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={{ size: 4 }}>
                  <FormGroup>
                    <Label>Phone No.</Label>
                    <Input
                      type="text"
                      name="phone"
                      placeholder="Enter Phone Number"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email Id</Label>
                    <Input type="email" name="email" placeholder="Email" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Additional Phone Number(Optional)</Label>
                    <Input type="text" name="phone2" />
                  </FormGroup>
                  <FormGroup>
                    <Label>D.O.B</Label>
                    <Input type="date" />
                  </FormGroup>
                </Col>
              </Row>
              <br />
              <p>
                <b>Family Details</b> <hr />
              </p>
              <div className="row">
                <div className="col-lg-4">
                  <FormGroup>
                    <Label>Child 1 Detail</Label>
                    <Input
                      type="text"
                      name="childname"
                      placeholder="Full Name"
                    />
                  </FormGroup>
                </div>
                <div className="col-lg-4">
                  <FormGroup>
                    <Label>D.O.B</Label>
                    <Input type="date" />
                  </FormGroup>
                </div>
                <div className="col-lg-4">
                  <FormGroup style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <Label>Gender</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          // id="inline-radio1"
                          name="child1"
                          value="option1"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="inline-radio1"
                        >
                          Male
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          // id="inline-radio2"
                          name="child1"
                          value="option2"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="inline-radio2"
                        >
                          Female
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </div>
                <div className="col-lg-4">
                  <FormGroup>
                    <Label>Child 2 Detail</Label>
                    <Input
                      type="text"
                      name="childname"
                      placeholder="Full Name"
                    />
                  </FormGroup>
                </div>
                <div className="col-lg-4">
                  <FormGroup>
                    <Label>D.O.B</Label>
                    <Input type="date" />
                  </FormGroup>
                </div>
                <div className="col-lg-4">
                  <FormGroup style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <Label>Gender</Label>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="9">
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          name="child2"
                          value="option1"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="inline-radio1"
                        >
                          Male
                        </Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="radio"
                          // id="inline-radio2"
                          name="child2"
                          value="option2"
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor="inline-radio2"
                        >
                          Female
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </div>
              </div>
              <div className="row col-lg-3">
                <Button className="add-child-button">Add Child</Button>
              </div>
            </Form>
          </CardBody>
        </Card>

        <div className="text-center mt-4 pb-5">
          <Button className="btn text-center" style={{ width: "108px" }}>
            Save
          </Button>
          <Button
            className="btn text-center ml-4 discardButton"
            style={{ width: "108px" }}
            onClick={this.handleDiscard}
          >
            Discard
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;
