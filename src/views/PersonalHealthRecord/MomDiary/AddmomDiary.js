import React from "react";
import { Form, Label, Col, Input, FormGroup } from "reactstrap";
// import Axios from "axios";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { addMomDiaries } from "../../../services/apiService";
import swal from "sweetalert";
import Clock from "./Clock";
import ButtonComponent from "../ButtonComponent";

class AddmomDiary extends React.Component {
  state = {
    title: "",
    text: "",
    mood: "",
    file:'',
    successmsg: "",
    errormsg: "",
    redirect: false
  };

  handleDiscard = () => {
    this.setState({ title: "", text: "" });
    this.props.history.goBack();
    this.setState({ title: "", text: "", mood: "" });
    this.props.history.goBack()
  };



  handleChange = (e) =>{
    console.log(e.target.files)
    if(e.target.type === "file"){
      this.setState({file:e.target.files[0]})
    }
    else{
      this.setState({[e.target.name]:e.target.value})
    }
  }



  handleClick = e => {
    e.preventDefault();
    const { title, text, mood , file } = this.state;
    console.log(this.state)
    const data = {
      title,
      text,
      mood
    };

    let formdata = new FormData();

    for(let key in data) {
      formdata.append(key, data[key])
    }
    formdata.append("file", file)
    console.log(formdata)
    addMomDiaries(formdata)
      .then(res => {
        console.log(res);
        this.setState({ successmsg: res.data.message, redirect: true });
        swal("Diary created successfully,", "", "success");
      })
      .catch(err => {
        console.log(err);
        this.setState({ errormsg: err.message });
        // swal("Diary created successfully,", "", "success");
      });
    this.setState({ title: "", text: "", mood: "" });
  };




  addDiary = () => {
    const { title, text, mood } = this.state;
    this.modules = {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        // [{ header: [1, 2, 3, 4, 5, 6, true] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"] // remove formatting button
      ]
    };
    return (
      <div className="mt-4">
        <Form className="">
          <FormGroup row>
            {/* <div className="col-lg-1" /> */}
            <Label
              className="col-lg-1"
              style={{ fontSize: "16px" }}
              for="Title"
              sm={1}
            >
              <b>Title:</b>
            </Label>
            <Col sm={8} className="col-lg-6">
              <Input
                required
                type="text"
                name="title"
                value={title}
                placeholder="Title"
                onChange={e => this.setState({ title: e.target.value })}
              />
            </Col>
          </FormGroup>
          <ReactQuill
            required
            className="quill"
            bounds={".app"}
            value={text}
            modules={this.modules}
            onChange={value => this.setState({ text: value })}
          />
          <FormGroup row className="mt-3">
            <Label
              className="col-lg-1"
              style={{ fontSize: "16px" }}
              for="Mood"
              sm={1}
            >
              <b>Mood:</b>
            </Label>
            <Col sm={8} className="col-lg-4">
              <Input
                required
                type="text"
                name="mood"
                value={mood}
                placeholder="mood"
                onChange={e => this.setState({ mood: e.target.value })}
              />
            </Col>
            <Col sm={3} />
            <Label
              // className="col-lg-1"
              style={{ fontSize: "16px" }}
              for="Mood"
              sm={2}
            >
              <b>Add Image:</b>
            </Label>
            <Col sm={2}>
              <div className="upload-btn-wrapper">
                <button className="uploadBtn"> Upload</button>
                <input type="file" name="file" onChange={this.handleChange} />
              </div>
              <div>{this.state.file.name}</div>
            </Col>
          </FormGroup>
          <div className="text-center mt-4 pb-5">
            <ButtonComponent handleClick={this.handleClick} />
          </div>
        </Form>
      </div>
    );
  };

  render() {
    const addDiary = this.addDiary();
    const { redirect } = this.state;
    if (redirect === true) this.props.history.push("/momdiary");
    return (
      <div className="mt-4">
        <Clock date={new Date()} />
        {addDiary}
      </div>
    );
  }
}

export default AddmomDiary;
