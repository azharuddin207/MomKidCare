import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import PostTableView from "./PostTableView";
import AddBlogPost from "./AddBlogPost";
import AboutMe from "./AboutMe";
import {Link} from 'react-router-dom';

class PostTab extends React.Component {

state = {
  activeTab : "1",
  tabId:""
}



  static getDerivedStateFromProps(props, state) {
    const tabId = props.match.params.id;
    if (!tabId) {
      props.history.push("/blog/addblogpost");
    } else if (tabId !== state.tabId) {
      switch (tabId) {
        case "addblogpost":
          return { ...state, activeTab: "1", tabId };
        case "viewblog":
          return { ...state, activeTab: "2", tabId };
        case "aboutme":
          return { ...state, activeTab: "3", tabId };
        default:
          props.history.push("/blog/addblogpost");
      }
    }
    return null;
  }



toggle = tab => {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
};

componentDidMount() {
  const tabId = this.props.match.params.id;
  this.props.history.push(`/blog/${tabId}`);
}

  render() {
  return (
    <div>
      <Nav tabs >
        <NavItem>
          <NavLink
            tag={Link}
            to="/blog/addblogpost"
            className={classnames({ active: this.state.activeTab === "1" })}
            onClick={() => {
              this.toggle("1");
            }}
           >
            Write a Blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to="/blog/viewblog"
            className={classnames({ active: this.state.activeTab === "2" })}
            onClick={() => {
              this.toggle("2");
            }}
          >
            My Blog List
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link}
            to="/blog/aboutme"
            className={classnames({ active: this.state.activeTab === "3" })}
            onClick={() => {
              this.toggle("3");
            }}
          >
            About Me
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={this.state.activeTab} >
        <TabPane tabId="1">
          <AddBlogPost />
        </TabPane>
        <TabPane tabId="2">
          <PostTableView />
        </TabPane>
        <TabPane tabId="3">
          <AboutMe/>
        </TabPane>
      </TabContent>
    </div>
  );
}
}

export default PostTab;
