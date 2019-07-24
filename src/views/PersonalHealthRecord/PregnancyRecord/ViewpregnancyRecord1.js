import React from "react";
// import AddMedicalrecord from "../GeneralMedicalRecord/AddMedicalrecord";
// import {Table, Row, Card, CardBody, Col, Button} from 'reactstrap'
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Row,
  Col
} from "reactstrap";
import Pagination from '../../Pagination/Pagination'
// import Pagination from "react-js-pagination";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import Axios from "axios";
// require("bootstrap/less/bootstrap.less");
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// import Axios from "axios";
// import baseURL from "../../../config";
// import Axios from "axios";


class ViewpregnancyRecord extends React.Component {
  state = {
    activeTab: "1",
    pregnancyRecord:[],
    loading:true,
    pageOfItems: [],
    currentRecord: [],
    currentPage: null,
    pageLimit: 10,
    totalPages: null,
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  // downloadImages = async () => {
  //       // Axios.get(baseURL, {responseType:'blob'})
  // }



  onChangePage= (pageOfItems) =>{
    this.setState({ pageOfItems: pageOfItems });
  }


  onPageChanged = data => {
    const { pregnancyRecord } = this.state;
    console.log(pregnancyRecord)
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentRecord = pregnancyRecord.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentRecord, totalPages });
  };

  componentDidMount(){
    Axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((res=>{
        this.setState({
          pregnancyRecord:res.data,
          loading:false
        })
      }))
      .catch((err)=>{
        console.log(err);
        this.setState({
          loading:false,
        })
      })
  }


  render() {
    const {currentPage, pageLimit, pregnancyRecord} = this.state
    const totalRecord = pregnancyRecord.length
    const totalPages = Math.ceil(totalRecord / pageLimit);
    // console.log(currentRecord)
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

    return (
      <div>
        <Row>
          <Col xs="12" lg="12" style={{ margin: 0, padding: 0 }}>
            <Table responsive >
              <thead style={{ background: "#0BA0FA", color: "#ffffff" }}>
              <tr>
                <th>Sr.No</th>
                <th>Blog Date</th>
                <th>Blog Title</th>
                <th>Blog Categories</th>
                <th>Shares</th>
                <th>Views</th>
                <th>Comments</th>
                <th />
              </tr>
              </thead>
              {this.state.currentRecord.map((pr, i)=>{
                return(
                  <tbody key={i}>
                  <tr key={i}>
                    <td style={{width:"10%"}}>{(currentPage - 1) * pageLimit  + i + 1}</td>
                    <td style={{width:"10%"}}>{pr.title}</td>
                    <td style={{width:"10%"}}>{pr.body}</td>
                    <td style={{width:"10%"}}>Dr. Rajiv Bhatiya</td>
                    <td style={{width:"10%"}}> pdf</td>
                    <td style={{width:"10%"}}>My Reports</td>
                    <td style={{width:"10%"}}>reports.pdf</td>
                    <td style={{width:"10%"}}>
                      <Button
                        tag={Link}
                        to="/viewblog"
                        style={{ backgroundColor: "#0ba0fa" }}
                      >
                        View Blog
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                )
              })}

            </Table>
            <div className="text-center mt-4">
              <Button
                className="btn text-center "
                tag={Link}
                to={"/addpregnancyrecord"}
              >
                <i className="fa fa-plus-circle mr-2" /> Add New Record
              </Button>
            </div>
            <br></br>
            <div className="d-flex justify-content-center">
              <Pagination
                totalRecords={totalRecord}
                pageLimit={pageLimit}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
                totalPages={totalPages}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewpregnancyRecord;
