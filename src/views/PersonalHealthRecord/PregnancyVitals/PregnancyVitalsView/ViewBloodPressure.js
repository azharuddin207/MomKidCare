import React from "react";
import {Table} from "reactstrap";
import Axios from "axios";
import baseURL from "../../../../config";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
// import jsPDF from "jspdf";
// import logo from "../../../../assets/img/brand/logo.png";
// import html2canvas from "html2canvas";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class ViewBloodPressure extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    Axios.get(baseURL + "users/bloodpressure")
      .then(res => {
        console.log(res);
        this.setState({ data: res.data.data });
        // console.log(this.state.data);
      })
      .catch(err => console.log(err));
  }

  handleDelete = _id => {
    swal("Are you sure?", {
      buttons: {
        cancel: "no",
        catch: {
          text: "Delete",
          value: "catch"
        }
      }
    }).then(value => {
      switch (value) {
        case "catch":
          Axios.delete(baseURL + `users/bloodpressure/${_id}`)
            .then(result => {
              this.componentDidMount();
            })
            .catch(err => {
              console.log(err);
            });
          break;

        default:
          console.log("");
      }
    });
  };

  render() {
    const { data } = this.state;
    let temp = data.map(dt => {
      return {
        name: `${new Date(dt.testDate).getDate()}-${new Date(
          dt.testDate
        ).getMonth() + 1}`,
        Systolic: dt.systolicBloodPressure,
        Diastolic: dt.diastolicBloodPressure
      };
    });

    const renderLineChart = (
      <LineChart
        width={500}
        height={200}
        data={temp}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Systolic"
          stroke="#00B0F0"
          strokeWidth="2"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Diastolic"
          stroke="#ffc000"
          strokeWidth="2"
        />
      </LineChart>
    );
    return (
      <React.Fragment>
        <div className="chart-section mt-4 mb-4">{renderLineChart}</div>
        <Table className="dhoni">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date & Time of Test</th>
              <th>Lab Name</th>
              <th>Blood Pressure(systolic)(mmHg)</th>
              <th>Pulse Rate(bpm)</th>
              <th>Blood Pressure(Diastolic)(mmHg)</th>
              {/* <th>FT4(ng/dl)</th>
              <th>TSH(ng/dl)</th> */}
              {/* <th>File Uploaded</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((data, index) => {
              return (
                <tr key={data._id}>
                  <td scope="row">{index + 1}</td>
                  <td>{`${new Date(data.testDate).getDate()}-${new Date(
                    data.testDate
                  ).getMonth() + 1}-${new Date(
                    data.testDate
                  ).getFullYear()}`}</td>
                  <td>{data.labName}</td>
                  <td>{data.systolicBloodPressure}</td>
                  <td>{data.pulseRate}</td>
                  <td>{data.diastolicBloodPressure}</td>
                  {/* <td>{data.FT4}</td>
                  <td>{data.TSH}</td> */}
                  {/* <td></td> */}
                  <td className="row">
                    <i className="shareRecord fa fa-share  col-3" />
                    <Link
                      className="editRecord fa fa-pencil col-3"
                      to={`/edit-blood-pressure-vital/${data._id}`}
                    />
                    <i className="downloadRecord fa fa-download  col-3" />
                    <i
                      className="deleteRecord fa fa-trash  col-3"
                      onClick={() => this.handleDelete(data._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

      </React.Fragment>
    );
  }
}

export default ViewBloodPressure;
