import React from "react";
import {Button, Col, Form, Row, FormGroup, Input} from "reactstrap";
import Axios from "axios";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import baseURL from "../../../config";
import {Link} from 'react-router-dom';
import  CurrentPregnancy from './CurrentPregnancy'
import  PreviousPregnancy from './PreviousPregnancy'
import PrePregnancy from './PrePregnancy'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ViewpregnancyRecord extends React.Component {
  state = {
    activeTab: "1",
    loading: true,
    pageOfItems: [],
    currentRecord: [],
    currentPage: null,
    pageLimit: 10,
    totalPages: null,
    successmsg: '',
    errormsg: '',
    collapse: null,
    pregnancyType: "Previous Pregnancy (History)"
  };


  onChangePage = pageOfItems => {
    this.setState({pageOfItems: pageOfItems});
  };

  onPageChanged = data => {
    const {pregnancyRecord} = this.state;
    const {currentPage, totalPages, pageLimit} = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentRecord = pregnancyRecord.slice(offset, offset + pageLimit);
    this.setState({currentPage, currentRecord, totalPages});
  };

  componentDidMount() {
    console.log('hello')
    this.getPregnancyRecord()
  }

  getPregnancyRecord = async () => {
    try {
      let data = {
        type: this.state.pregnancyType
      };
      await Axios.post(baseURL + "users/pregnancy_record", data)
        .then((res) => {
          console.log(res.data)
          this.setState({pregnancyRecord: res.data.data, loading: false, successmsg: res.data.message})
        })
        .catch((err) => {
          console.log(err)
          this.setState({loading: false, errormsg: err.message})
        })
    } catch (e) {
      console.log(e.message)
    }
  }


  handleView = (pregnancyType, pregnancyRecord) => {
    if (pregnancyType === "Current Pregnancy(Pregnant)") {
      return <CurrentPregnancy pregnancyRecord={pregnancyRecord}/>
    }
    if (pregnancyType === "Previous Pregnancy (History)") {
      return <PreviousPregnancy pregnancyRecord={pregnancyRecord}/>
    }
    if (pregnancyType === "Pre-Pregnancy (Trying to concieve)") {
      return <PrePregnancy pregnancyRecord={pregnancyRecord}/>
    }

  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.pregnancyType !== this.state.pregnancyType ){
          this.getPregnancyRecord()
    }
  }


  render() {
    const {pregnancyRecord, pregnancyType, successmsg, errormsg} = this.state;
    // const totalRecord = pregnancyRecord.length;
    // const totalPages = Math.ceil(totalRecord / pageLimit);
    // console.log(pregnancyRecord)

    if (this.state.loading) {
      return (
        <div
          className="sweet-loading text-center"
          style={{ marginTop: "150px" }}
        >
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={80}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }

    if (successmsg && !errormsg) {
      return (
        <React.Fragment>
          <Form>
            <Row className="mt-3">
              <Col xs="12" className="col-md-4">
                <FormGroup>
                  <Input
                    type="select"
                    name="deseaseType"
                    onChange={(e) => this.setState({pregnancyType: e.target.value})}>
                    <option>Previous Pregnancy (History)</option>
                    <option>Pre-Pregnancy (Trying to concieve)</option>
                    <option>Current Pregnancy(Pregnant)</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Form>
          {this.handleView(pregnancyType, pregnancyRecord)}
          <div className="text-center mt-4">
            <Button
              className="btn text-center "
              tag={Link}
              to={"/addpregnancyrecord"}
            >
              <i className="fa fa-plus-circle mr-2"/> Add New Record
            </Button>
          </div>
        </React.Fragment>
      )

    }

    if(!successmsg && errormsg){
      return <div>{errormsg}</div>
    }
  }
}




export default ViewpregnancyRecord;


