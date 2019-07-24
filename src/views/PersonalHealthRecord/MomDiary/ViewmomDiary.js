import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row, Table, Button } from "reactstrap";
import swal from "sweetalert";
import "./MomDiary.scss";
import sad from "../../../assets/img/common/sad.png";
import { getMomDiaries, removeMomDiary } from "../../../services/apiService";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ViewmomDiary extends Component {
  state = {
    diaries: [],
    errormsg: "",
    successmsg: "",
    loading: true,
    found: false,
    _delete: false
  };

  componentDidMount() {
    const user = `5cfb57401ff190197f876360`;
    getMomDiaries(user)
      .then(({ data }) => {
        this.setState({
          diaries: data.diaries,
          loading: false,
          found: true,
          successmsg: data.message
        });
      })
      .catch(err => {
        this.setState({
          errormsg: err.message,
          loading: false
        });
      });
  }

  handleDelete = _id => {
    swal("Are you sure you want to delete diary?", {
      buttons: {
        catch: { text: "No", value: false },
        defeat: { text: "Yes", value: true }
      }
    })
      .then(value => {
        if (value === true) {
          removeMomDiary(_id)
            .then(res => {
              if (res.status === 200) {
                this.setState({ _delete: true });
                this.componentDidMount();
                this.state.diaries.filter(diary => diary._id !== _id);
                swal("Diary  deleted", "", "success");
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => swal("something went wrong", "", "error"));
  };

  renderList = () => {
    const { diaries } = this.state;
    if (diaries === null || diaries === undefined)
      return (
        <div className="text-center">
          <h1>No Record Found</h1>
        </div>
      );
    else {
      const List = diaries.map((diary, i) => {
        return (
          <tbody key={i + 1}>
          <tr>
            <td>{i + 1}</td>
            <td>{diary.title}</td>
            <td>{diary.mood}</td>
            <td><a href={diary.image} target="_blank">Link</a></td>
            <td>
              {new Date(diary.createdAt).getDate() +
              "-" +
              new Date(diary.createdAt).getMonth() +1+
              "-" +
              new Date(diary.createdAt).getFullYear()}
            </td>
            <td>
              {new Date(diary.updatedAt).getDate() +
              "-" +
              new Date(diary.updatedAt).getMonth() +1+
              "-" +
              new Date(diary.updatedAt).getFullYear()}
            </td>
            <td>
              <div className="row">
                <Link to={`/diary/${diary._id}`}>
                  <i className="viewDiary col-4 fa fa-bars" />
                </Link>

                <Link to={`/editmomdiary/${diary._id}`} className="col-4">
                  <i className="editDiary fa fa-pencil" />
                </Link>

                <i
                  onClick={() => this.handleDelete(diary._id)}
                  className="deleteDiary col-4 fa fa-trash"
                />
              </div>
            </td>
          </tr>
          </tbody>
        );
      });
      return List;
    }
  };

  render() {
    const List = this.renderList();
    const { errormsg, successmsg } = this.state;

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
    if (!errormsg && successmsg) {
      return (
        <div>
          <Row>
            <Col xs="12" lg="12">
              <Card className="MomDiaryTableCard">
                <CardBody style={{ padding: 0 }}>
                  <Table responsive>
                    <thead className="tableHeader">
                    <tr>
                      <th>S.No.</th>
                      <th>Title</th>
                      <th>Mood</th>
                      <th>Image</th>
                      <th>Writtten on</th>
                      <th>Last Modified</th>
                      <th>Actions</th>
                    </tr>
                    </thead>
                    {List}
                  </Table>
                </CardBody>
              </Card>
              <div className="text-center">
                <Button
                  className="btn text-center"
                  tag={Link}
                  to={"/addmomdiary"}
                >
                  Add New Diary Entry
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      );
    }

    if (!successmsg && errormsg) {
      return (
        <div className="text-center" style={{ margin: "10em auto" }}>
          <p style={{ color: "#535771" }}>
            <img src={sad} className="mb-4" alt="" />
            {errormsg}
          </p>
        </div>
      );
    }
  }
}

export default ViewmomDiary;
