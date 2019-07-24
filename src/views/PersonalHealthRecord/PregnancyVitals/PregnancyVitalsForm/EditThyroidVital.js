import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import SubDocument from "./EditSubDocument";
import ButtonComponent from "../../ButtonComponent";
import Axios from "axios";
import baseURL from "../../../../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditPregnancyvitalsThyroid extends React.Component {
  state = {
    testDate: "",
    T3: "",
    T4: "",
    labName: "",
    FT3: "",
    FT4: "",
    TSH: "",
    documentTitle: "",
    documentDescription: "",
    files: []
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    const files = e.target.files;
    if (type === "file") {
      this.setState({
        [name]: files
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  renderFileName = files => {
    let filename = [];
    for (let i = 0; i < files.length; i++) {
      filename.push(<ol key={i}>{files[i].name}</ol>);
    }
    return filename;
  };

  handleClick = () => {
    const {
      testDate,
      T3,
      T4,
      labName,
      FT3,
      FT4,
      TSH,
      documentTitle,
      documentDescription,
      files
    } = this.state;
    const data = {
      testDate,
      T3,
      T4,
      labName,
      FT3,
      FT4,
      TSH,
      documentTitle,
      documentDescription
    };

    if (data === null || files === undefined) {
      return false;
    }
    const formdata = new FormData();
    for (let key in data) {
      formdata.append(key, data[key]);
    }
    formdata.append("deseaseType", this.props.deseaseType);
    for (let i = 0; i < files.length; i++) {
      formdata.append(files[i].name, files[i]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    Axios.post(baseURL + `users/thyroid`, formdata, config)
      .then(res => {
        // console.log(res)
        toast.success("upload success");
      })
      .catch(err => {
        // console.log(err);
        toast.error("upload fail");
      });
  };

  componentDidMount() {

    let id = this.props.match.params.id;
    Axios.get(baseURL + `users/thyroid/${id}`)
      .then(res => {
        console.log(res)
        console.log('hhel')
        const {
          testDate,
          T3,
          T4,
          labName,
          FT3,
          FT4,
          TSH,
          documentTitle,
          documentDescription,
          files
        } = res.data.data;
        this.setState({
          testDate,
          T3,
          T4,
          labName,
          FT3,
          FT4,
          TSH,
          documentTitle,
          documentDescription,
          files
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {
      // testDate,
      T3,
      T4,
      labName,
      FT3,
      FT4,
      TSH,
      documentTitle,
      documentDescription,
      files
    } = this.state;
    // console.log(Date(testDate));
    // console.log(
    //   `${new Date(testDate).getDate()}/0${new Date(testDate).getMonth() +
    //     1}/${new Date(testDate).getFullYear()}`
    // );
    return (
      <div className="card p-4">
        <Form>
          <Row>
            <Col xs="12" className="col-md-4">
              <FormGroup>
                <Label for="dateandtime">Date and Time test</Label>
                <DatePicker
                  name="testDate"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dateFormat="dd/MM/yyyy"
                  dropdownMode="select"
                  // selected={Date(testDate)}
                  // selected={`${new Date(testDate).getDate()}/${new Date(testDate).getMonth()+1}/${new Date(testDate).getFullYear()}`}
                  // value={`${new Date(testDate).getMonth()+1}/${new Date(
                  //   testDate
                  // ).getDate()}/${new Date(testDate).getFullYear()}`}
                  //               selected={`${new Date(testDate).getDate()}/0${new Date(
                  //   testDate
                  // ).getMonth() + 1}/${new Date(testDate).getFullYear()}`}
                  // onChange={e => this.setState({ testDate: e.target.value })}
                />
                {/* <Input
                  type="text"
                  name="testDate"
                  value={`${new Date(testDate).getDate()}/0${new Date(
                    testDate
                  ).getMonth() + 1}/${new Date(testDate).getFullYear()}`}
                  onChange={e => this.setState({ testDate: e.target.value })}
                /> */}
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="t3">T3</Label>
                <Input
                  type="text"
                  name="T3"
                  placeholder="ng/dl"
                  value={T3}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="t4">T4</Label>
                <Input
                  type="text"
                  name="T4"
                  placeholder="ng/dl"
                  value={T4}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="col-md-4">
              <FormGroup>
                <Label for="labname">Lab Name</Label>
                <Input
                  type="text"
                  name="labName"
                  value={labName}
                  placeholder="Enter Lab Name"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="ft3">FT3</Label>
                <Input
                  type="text"
                  name="FT3"
                  value={FT3}
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
            <Col xs="6" className="col-md-4">
              <FormGroup>
                <Label for="ft4">FT4</Label>
                <Input
                  type="text"
                  name="FT4"
                  value={FT4}
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label for="tsh">TSH</Label>
                <Input
                  type="text"
                  name="TSH"
                  value={TSH}
                  placeholder="ng/dl"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <SubDocument
          docdata={{ documentTitle, documentDescription, files }}
          handleChange={this.handleChange}
          renderFileName={this.renderFileName(files)}
        />
        <ButtonComponent handleClick={this.handleClick} />
      </div>
    );
  }
}

export default EditPregnancyvitalsThyroid;
