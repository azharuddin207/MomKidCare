import React from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import baseurl from "../../../config";
class AboutMe extends React.Component {
  state = {
    summary: "",
    instagram: "",
    facebook: "",
    twitter: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    let data = this.state;
    axios
      .post(baseurl + "users/aboutme", data)
      .then(res => {
        if (res.data.message === "success") {
          console.log("hi");

          this.setState({
            summary: "",
            instagram: "",
            facebook: "",
            twitter: ""
          });
          this.componentDidMount();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get(baseurl + "users/aboutme")
      .then(res => {
        if (res.data.message === "success") {
          const { summary, instagram, facebook, twitter } = res.data.about;
          this.setState({ summary, instagram, facebook, twitter });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { summary, instagram, facebook, twitter } = this.state;
    return (
      <div className="p-3">
        <Form onSubmit={this.onSubmit}>
          <Label>About Me</Label>
          <ReactQuill
            required
            className="quill"
            bounds={".app"}
            value={summary}
            modules={this.modules}
            onChange={value => this.setState({ summary: value })}
          />
          <br />
          <Label className="mt-1">Social Media Profile Link </Label>
          <Row>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup inline>
                <Label>Instagram</Label>
                <Input
                  type="text"
                  name="instagram"
                  value={instagram}
                  onChange={e => this.setState({ instagram: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Facebook</Label>
                <Input
                  value={facebook}
                  type="text"
                  name="facebook"
                  onChange={e => this.setState({ facebook: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Twitter</Label>
                <Input
                  type="text"
                  value={twitter}
                  name="twitter"
                  onChange={e => this.setState({ twitter: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          {/* <Button>Submit</Button> */}
          <div className="text-center mt-5 pb-5">
            <Button
              className="btn text-center col-md-6 xs-12"
              style={{ width: "100px" }}
              type="submit"
            >
              Save
            </Button>
            <Link
              to="/posttab"
              className="btn btn-secondary text-center ml-4 discardButton col-md-6 xs-12"
              style={{ width: "100px" }}
            >
              Discard
            </Link>
          </div>
        </Form>

        {/* <ButtonComponent clickHandler={this.onClick} /> */}
      </div>
    );
  }
}

export default AboutMe;
