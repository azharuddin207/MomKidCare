import React from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import ButtonComponent from "../ButtonComponent";
import baseURL from "../../../config";
import AddForm from "./AddForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let options = [];

const defaultDocument = {
  documentType: "",
  title: "",
  description: "",
  appointmentDate: "",
  imageAndPdf: ""
};
class AddpregnancyRecord extends React.Component {
  state = {
    activeTab: "1",
    pregnancyType: "Previous Pregnancy History",
    lastMenstrualPeriodDate: "",
    gynecologystName: "",
    hospitalName: "",
    phone: "",
    pregnancyStage: "Normal pregnancy",
    imageAndPdf: "",
    documentType: "Prescription",
    title: "",
    description: "",
    appointmentDate: "",
    document: [defaultDocument]
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addDocument = () => {
    this.setState(prevState => ({
      document: prevState.document.concat(defaultDocument)
    }));
  };

  onChangeDoc = ({ target: { name, type, value, files } }, id) => {
    this.setState(prevState => ({
      document: prevState.document.map((doc, i) => {
        if (i === id) {
          if (type === "file") {
            return {
              ...doc,
              [name]: files
            };
          } else {
            return {
              ...doc,
              [name]: value
            };
          }
        } else {
          return doc;
        }
      })
    }));
  };

  // onSelectHandler = () =>{
  //   this.setState({[name]:value})
  //   if(this.state.pregnancyType!=="Previous Pregnancy History"){
  //     this.setState
  //   }
  // }

  checkFileSize = event => {
    let files = event.target.files;
    let size = 20000;
    let err = "";
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    //  if (err !== '') {
    //     event.target.value = null
    //     console.log(err)
    //     return false
    // }
    for (let z = 0; z < err.length; z++) {
      toast.error(err[z]);
      event.target.value = null;
    }
    return true;
  };

  maxSelectFile = event => {
    // let files = event.target.files // create file object
    //     if (files.length > 4) {
    //        const msg = 'Only 4 images can be uploaded at a time'
    //        event.target.value = null // discard selected file
    //        console.log(msg)
    //       return false;
    //   }
    // return true;
  };

  typeChecker = (file, types) => {
    return types.every(type => file.type !== type) ? true : false;
  };

  checkMimeType = event => {
    //getting file object
    let files = event.target.files;
    //define message container
    let err = "";
    // list allow mime type
    // loop access array
    const types = ["image/png", "image/jpeg", "application/pdf"];
    for (let x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (this.typeChecker(files[x], types)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
      }
    }

    for (let z = 0; z < err.length; z++) {
      // loop create toast massage
      event.target.value = null;
      toast.error(err[z]);
    }
    //  if (err !== '') { // if message not same old that mean has error
    //       event.target.value = null // discard selected file
    //       console.log(err)
    //        return false;
    //   }
    return true;
  };

  // componentDidUpdate(){
  //   if(this.state.pregnancyType !==  'Previous Pregnancy History'){
  //     this.setState({pregnancyStage:"0-6 Weeks"})
  //   }
  // }

  onClick = e => {
    e.preventDefault();
    const {
      pregnancyType,
      lastMenstrualPeriodDate,
      gynecologistName,
      hospitalName,
      phone,
      pregnancyStage,
      document
    } = this.state;
    console.log(this.state);
    const values = {
      pregnancyType,
      lastMenstrualPeriodDate,
      gynecologistName,
      hospitalName,
      phone,
      pregnancyStage
    };
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    const formdata = new FormData();
    for (let key in values) {
      formdata.append(key, values[key]);
    }
    for (let i = 0; i < document.length; i++) {
      for (let key in document[i]) {
        if (key === "imageAndPdf") {
          for (let j = 0; j < document[i][key].length; j++) {
            formdata.append(key + i, document[i][key][j]);
          }
        } else {
          formdata.append(key, document[i][key]);
        }
      }
    }
    axios
      .post(baseURL + `users/pcrecord`, formdata, config)
      .then(res => {
        console.log(res);
        toast.success("upload success");
      })
      .catch(err => {
        console.log(err);
        toast.error("upload fail");
      });
  };

  render() {
    return (
      <div className="mt-4">
        <AddForm
          onChange={this.onChange}
          onChangeDoc={this.onChangeDoc}
          removethisDoc={this.removethisDoc}
          addDocument={this.addDocument}
          state={this.state}
          options={options}
          onSelectHandler={this.onSelectHandler}
        />
        <div className="text-center mt-5 pb-5">
          <ButtonComponent handleClick={this.onClick} />
          <div className="form-group">
            <ToastContainer />
          </div>
        </div>
      </div>
    );
  }

  removethisDoc = () => {
    let index = this.state.document.length - 1;
    this.setState(prevState => ({
      document: prevState.document.filter((doc, i) => i !== index)
    }));
  };
}

export default AddpregnancyRecord;
