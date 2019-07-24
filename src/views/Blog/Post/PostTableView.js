import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import baseURL from "../../../config";
import {
  Table,
  Button,
  Row,
  Col
} from "reactstrap";
import Pagination from '../../Pagination/Pagination'
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



class PostTableView extends React.Component {
  state = {
    activeTab: "1",
    post:[],
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
    const { post } = this.state;
    // console.log(post, "onpagechanged")
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentRecord = post.slice(offset, offset + pageLimit);
    // console.log(currentRecord, "current ")
    this.setState({ currentPage, currentRecord, totalPages });
  };

  componentDidMount(){
    Axios.get(baseURL +'users/blogs')
      .then((res=>{
        // console.log(res.data.data.blogpost, "response")
        this.setState({
          post:res.data.data.blogpost,
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
    const {currentPage, pageLimit, post, currentRecord} = this.state
    // console.log(post, "render")
    // console.log(currentRecord, "current record render")
    const totalRecord = post.length
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
    // transition: 0.2s all ease;
    // border-radius: 6px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    return (
      <div>
        <Row>
          <Col xs="12" lg="12" style={{ margin: 0, padding: 0 }}>
            <Table responsive >
              <thead style={{ background: "#0BA0FA", color: "#ffffff", boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.2)"}}>
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
              {currentRecord.length <= 0  ? 
                <h3 style={{align:"center"}}
                >
                No Record Found</h3>
              :
             currentRecord.map((pr, i)=>{
                return(
                  <tbody key={i}>
                  <tr key={i}>
                    <td style={{width:"10%"}}>{(currentPage - 1) * pageLimit  + i + 1}</td>
                    <td style={{width:"10%"}}>{
                      new Date(pr.createdAt).getDate() + "-" +
                       (new Date(pr.createdAt).getMonth()+1) + "-" +
                      new Date(pr.createdAt).getFullYear()}</td>
                    <td style={{width:"10%"}}>{pr.title}</td>
                    <td style={{width:"10%"}}></td>
                    <td style={{width:"10%"}}>{pr.share}</td>
                    <td style={{width:"10%"}}>{pr.views}</td>
                    <td style={{width:"10%"}}>
                       <div dangerouslySetInnerHTML={{__html: pr.summary.slice(0,50)}}></div></td>
                    <td style={{width:"10%"}}>
                      <Button
                        tag={Link}
                        to={`/editblog/${pr._id}`}
                        style={{ backgroundColor: "#0ba0fa" }}
                      >
                          Edit Blog
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                )
              })}

            </Table>
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

export default PostTableView;
