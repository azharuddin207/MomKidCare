import React from "react";
import { Table } from "reactstrap";
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
import jsPDF from "jspdf";
import logo from "../../../../assets/img/brand/logo.png";
import html2canvas from "html2canvas";
import swal from "sweetalert";
import { Link } from "react-router-dom";

class ViewThyroid extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    Axios.get(baseURL + "users/thyroid")
      .then(res => {
        // console.log(res);
        this.setState({ data: res.data.data });
        // console.log(this.state.data);
      })
      .catch(err => console.log(err));
  }

  generatePdf = async e => {
    e.preventDefault();

    var doc = new jsPDF({
      // orientation: 'landscape',
      unit: "in",
      format: [595, 842]
    });
    doc.setFont("helvetica");
    doc.setFontSize(12);
    doc.addImage(logo, "PNG", 0.5, 0.5, 1.5, 0.5);
    doc.text(
      "We are committed to support you through your journey to motherhood.",
      0.5,
      1.3
    );

    console.log(document.getElementsByClassName("dhoni")[0]);

    let a = await html2canvas(document.getElementsByClassName("dhoni")[0]);
    console.log(a);
    doc.addSVG(a, 0.5, 1.5);
    doc.save(`demo.pdf`);

    // doc.addHTML(document.getElementsByClassName("table")[0], 0.5,1.5);
    // doc.addHTML(document.getElementsByClassName("recharts-wrapper")[0], 1,1, 0.5, 1.3);
    // format: (image_file, 'image_type', X_init, Y_init, X_fin, Y_fin)

    // doc.save(`demo.pdf`)
  };

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
          Axios.delete(baseURL + `users/thyroid/${_id}`)
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
        return ({
          name: `${new Date(dt.testDate).getDate()}-${new Date(
            dt.testDate
          ).getMonth() + 1}`,
          T3: dt.T3,
          T4: dt.T4,
          TSH: dt.TSH
        })
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
          dataKey="T3"
          stroke="#00B0F0"
          strokeWidth="2"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="T4" stroke="#ffc000" strokeWidth="2" />
        <Line type="monotone" dataKey="TSH" stroke="#00D271" strokeWidth="2" />
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
              <th>T3(ng/dl)</th>
              <th>T4(ng/dl)</th>
              <th>FT3(ng/dl)</th>
              <th>FT4(ng/dl)</th>
              <th>TSH(ng/dl)</th>
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
                  <td>{data.T3}</td>
                  <td>{data.T4}</td>
                  <td>{data.FT3}</td>
                  <td>{data.FT4}</td>
                  <td>{data.TSH}</td>
                  {/* <td></td> */}
                  <td className="row">
                    <i className="shareRecord fa fa-share  col-3" />
                    <Link
                      className="editRecord fa fa-pencil col-3"
                      to={`/edit-thyroid-vital/${data._id}`}
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
        <button onClick={this.generatePdf}>download</button>
      </React.Fragment>
    );
  }
}

export default ViewThyroid;
