import React from "react";
// import { ClipLoader } from "react-spinners";
// import { css } from "@emotion/core";
import Axios from "axios";
// require("bootstrap/less/bootstrap.less");
// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

class ViewBlog extends React.Component {
  state = {
    post: []
  };

  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        // console.log(res.data)
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
    return (
      <div>
        {this.state.post.map((p, i) => {
          return (
            <ul key={i}>
              <li>{p.id}</li>
              <li>{p.title}</li>
              <li>{p.body}</li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default ViewBlog;
