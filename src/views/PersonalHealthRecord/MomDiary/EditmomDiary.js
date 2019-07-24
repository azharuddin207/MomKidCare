import React from "react";
import { getOneMomDiary, updateMomDiary } from "../../../services/apiService";
import { Form, Label, Col, Input, FormGroup, Button } from "reactstrap";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import swal from "sweetalert";
class EditmomDiary extends React.Component {
  state = {
    title: "",
    text: "",
    diaryId: "",
    mood:'',
    file:'',
    redirect: false,
    link:''
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


  handleDiscard = () => {
    this.setState({ title: "", text: "" });
    this.props.history.push("/momdiary");
  };

  componentDidMount() {
    const diaryId = this.props.match.params.id;
    console.log(diaryId)
    this.setState({ diaryId });
    getOneMomDiary(diaryId)
      .then(({ data }) => {
        console.log(data);
        this.setState({ title:data.diary.title, text: data.diary.text,
          mood:data.diary.mood, diaryId:diaryId, link:data.diary.image});
      })
      .catch(err => {
        console.log(err);
      });
  }

  update = () => {
    const { title, text, diaryId, mood, file} = this.state;
    console.log(this.state)
    const data = { title, text, diaryId, mood };
    let formdata = new FormData();
    for(let key in data){
      formdata.append(key, data[key])
    }
    formdata.append("file", file)
    updateMomDiary(formdata, diaryId)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ redirect: true, text: "", title: "" });
          swal("Diary updated successfully,", "", "success");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  editForm = () => {
    const { title, text, mood, link } = this.state;
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
        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"] // remove formatting button
      ]
    };
    return (
      <Form>
        <FormGroup row>
            {/* <div className="col-lg-1" /> */}
            <Label
              className="col-lg-1"
              style={{ fontSize: "18px" }}
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
            <a href={link} download target="_blank" className="mr-3">
                  Link
            </a>
          </Col>
        </FormGroup>

        <div className="text-center mt-4 pb-5">
          <Button
            className="btn text-center"
            style={{ width: "108px" }}
            onClick={this.update}
          >
            Save
          </Button>
          <Button
            className="btn text-center ml-4 discardButton"
            style={{ width: "108px" }}
            onClick={this.handleDiscard}
          >
            Discard
          </Button>
        </div>
      </Form>
    );
  };

  render() {
    if (this.state.redirect) this.props.history.push("/momdiary");
    return <div className="container mt-4">{this.editForm()}</div>;
  }
}

export default EditmomDiary;
