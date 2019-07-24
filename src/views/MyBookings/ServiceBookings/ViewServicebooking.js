import React from "react";
import {
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Collapse
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";

class ViewServicebooking extends React.Component {
  state = {
    activeTab: "1",
    collapse: false
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  toggles = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  };

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Service Bookings
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Service Feedback
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12" style={{ margin: 0, padding: 0 }}>
                <Row>
                  <Col>
                    {/* <Card> */}
                    {/* <CardBody> */}
                    <Table responsive>
                      <thead
                        style={{ background: "#0BA0FA", color: "#ffffff" }}
                      >
                      <tr>
                        <th>S.No</th>
                        <th>Service/BookingID</th>
                        <th>Name of Service Booked</th>
                        <th>Booking Date</th>
                        <th>Date & Service Time</th>
                        <th>Mode of Service</th>
                        <th>Current Status</th>
                        <th />
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>1</td>
                        <td>4156610</td>
                        <td>Ultrasonography</td>
                        <td>02-06-19</td>
                        <td>05-06-19 at 10:15AM</td>
                        <td>Clinic</td>
                        <td>Booked</td>
                        <td>
                          <i
                            className={
                              this.state.collapse
                                ? "icon-arrow-down"
                                : "icon-arrow-left"
                            }
                            onClick={this.toggles}
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="8">
                          <Collapse isOpen={this.state.collapse}>
                            <div className="row">
                              <div className="col-sm-3">
                                <p>
                                  <b>Dr. Krishnan Gopinathan</b>
                                </p>
                                <img
                                  className="account-image"
                                  src="https://pbs.twimg.com/profile_images/1131946474537750528/AQl6zofd.jpg"
                                  alt=""
                                />
                                <br/><br/>
                                <Link to="/">Service Feedback</Link>
                              </div>
                              <div className="col-sm-4">
                                <ul>
                                  <p>Counselling</p>
                                  <ol>1. details of Service booked</ol>
                                  <ol>2. details of Service booked</ol>
                                  <ol>3. details of Service booked</ol>
                                  <ol>
                                    <Link to="/">View more</Link>
                                  </ol>
                                </ul>
                              </div>

                              <div className="col-sm-5">
                                <p>Payment Summary</p>
                                <Table>
                                  <tbody>
                                  <tr>
                                    <td>Booking Amount</td>
                                    <td>Rs. 449</td>
                                  </tr>
                                  <tr>
                                    <td>Invoice Amount</td>
                                    <td>Rs. 449</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <strong>Amount Paid</strong>
                                    </td>
                                    <td>
                                      <b>Rs. 449</b>
                                    </td>
                                  </tr>
                                  <Link to='/'>Download Invoice</Link>
                                  <tr>
                                    <td>
                                      <button className=" btn-primary btn-sm">
                                        Reschedule
                                      </button>
                                    </td>
                                    <td>
                                      <button className=" btn-danger btn-sm">
                                        Cancel
                                      </button>
                                    </td>
                                  </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </Collapse>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>4156610</td>
                        <td>Ultrasonography</td>
                        <td>02-06-19</td>
                        <td>05-06-19 at 10:15AM</td>
                        <td>Clinic</td>
                        <td>Booked</td>
                        <td>
                          <i
                            className="icon-arrow-left"
                            onClick={this.toggle}
                          />
                        </td>
                      </tr>
                      </tbody>
                    </Table>
                    {/* </CardBody> */}
                    {/* </Card> */}
                  </Col>
                </Row>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <div>Service Feedback</div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default ViewServicebooking;
