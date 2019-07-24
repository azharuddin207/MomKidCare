import React from "react";
// import AddMedicalrecord from "../General Medical Record/AddMedicalrecord";
// import {Table, Row, Card, CardBody, Col, Button} from 'reactstrap'
// import { Link, Redirect } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ViewmomDiary from "./MomDiary/ViewmomDiary";
import ViewPregnancyvitals from "./PregnancyVitals/PregnancyVitalsView/ViewPregnancyVitals";
import ViewpregnancyRecord from "./PregnancyRecord/ViewpregnancyRecord";
import ViewMedicalrecord from "./GeneralMedicalRecord/ViewMedicalrecord";
import ViewChildrecord from "./ChildRecord/ViewChildrecord";
import ViewSharemyrecord from "./ShareMyRecord/ViewSharemyrecord";
import {Link} from 'react-router-dom'

class PhrTab extends React.Component {
  state = {
    activeTab: "1",
    tabId: ""
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  componentDidMount(){
    const tabId = this.props.match.params.tabId;
    this.props.history.push(`/personalhealthrecord/${tabId}`);

  }


  static getDerivedStateFromProps(props, state) {
    const tabId = props.match.params.tabId;
    if (!tabId) {
      props.history.push("/personalhealthrecord/pregnancyrecord");
    } else if (tabId !== state.tabId) {
      switch (tabId) {
        case "pregnancyrecord":
          return { ...state, activeTab: "1", tabId };
        case "childrecord":
          return { ...state, activeTab: "2", tabId };
        case "generalmedicalrecord":
          return { ...state, activeTab: "3", tabId };
        case "momdiary":
          return { ...state, activeTab: "4", tabId };
        case "pregnancyvitals":
          return { ...state, activeTab: "5", tabId };
        case "sharemyrecord":
          return { ...state, activeTab: "6", tabId };
        default:
          props.history.push("/personalhealthrecord/pregnancyrecord");
      }
    }
    return null;
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>

            <NavLink
              tag={Link}
              to={"/personalhealthrecord/pregnancyrecord"}
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Pregnancy Record
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to={"/personalhealthrecord/childrecord"}
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Child Record
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to={"/personalhealthrecord/generalmedicalrecord"}
              className={classnames({ active: this.state.activeTab === "3" })}
              onClick={() => {
                this.toggle("3");
              }}
            >
              General Medical Record
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
            tag={Link}
              to={"/personalhealthrecord/momdiary"}
              className={classnames({ active: this.state.activeTab === "4" })}
              onClick={() => {
                this.toggle("4");
              }}
            >
              Mom's Diary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to={"/personalhealthrecord/pregnancyvitals"}
              className={classnames({ active: this.state.activeTab === "5" })}
              onClick={() => {
                this.toggle("5");
              }}
            >
              Pregnancy Vitals
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              tag={Link}
              to={"/personalhealthrecord/sharemyrecord"}
              className={classnames({ active: this.state.activeTab === "6" })}
              onClick={() => {
                this.toggle("6");
              }}
            >
              Share My Record
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <ViewpregnancyRecord />
          </TabPane>
          <TabPane tabId="2">
            <ViewChildrecord />
          </TabPane>
          <TabPane tabId="3">
            <ViewMedicalrecord />
          </TabPane>
          <TabPane tabId="4">
            <ViewmomDiary/>
          </TabPane>
          <TabPane tabId="5">
            <ViewPregnancyvitals />
          </TabPane>
          <TabPane tabId="6">
            <ViewSharemyrecord />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default PhrTab;
