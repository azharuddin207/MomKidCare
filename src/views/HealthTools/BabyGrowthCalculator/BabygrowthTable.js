import React from "react";
import { Table } from "reactstrap";
import Axios from "axios";

class BabygrowthTable extends React.Component {
  state = {
    post: []
  };

  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        this.setState({
          post: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    const { post } = this.state;
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Age</th>
              <th>Hieght Percentile</th>
              <th>Weight Percentile</th>
              <th>Head Circumference Percentile</th>
              <th>Weight & Height ratio</th>
            </tr>
          </thead>
          {post.map((p, i) => {
            return (
              <tbody key={i}>
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{p.name}</td>
                  <td>{p.username}</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    );
  }
}

export default BabygrowthTable;
