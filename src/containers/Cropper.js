// import "./cropper2.css"
import React from "react";
import Dropzone from "react-dropzone";

import { Modal, ModalBody, ModalFooter, ModalHeader,Button } from "reactstrap";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const imageMaxSize = 8388608; // bytes
const acceptedFileTypes =
  "image/x-png,image/x-jpg,image/png,image/jpeg,image/gif";
export const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});



  
// export const handleOnDrop = (acceptedFiles, rejectedFiles) => {
//     console.log(acceptedFiles);

//     if (rejectedFiles && rejectedFiles.length > 0) {
//       console.log(rejectedFiles);
//       this.verifyImage(rejectedFiles);
//     }

//     if (acceptedFiles && acceptedFiles.length > 0) {
//       const isVerified = verifyImage(acceptedFiles);
//       if (isVerified) {
//         alert("Your Image Accepted");

//         const currentFile = acceptedFiles[0];

//         const reader = new FileReader();
//         reader.addEventListener(
//           "load",
//           () => {
//             var i = new Image();

//             i.onload = () => {
//               alert(i.width + ", " + i.height);

//             };
            
//             i.src = reader.result;
//         },
//         false
//         );
        
//         var  base64Url = reader.result;
//         reader.readAsDataURL(currentFile);
        
//       }
//     }
//     console.log(base64Url)
//     return base64Url;
//   };

 export const verifyImage = files => {
    const currentFile = files[0];
    const currentFileType = currentFile.type;
    const currentFileSize = currentFile.size;

    if (currentFileSize > imageMaxSize) {
      alert("Please upload a image of size less than 2MB");
      return false;
    }
    if (!acceptedFileTypes.includes(currentFileType)) {
      alert("File Format Not Allowed,Upload Only Images");
      return false;
    }

    return true;
  };




class MyCropper extends React.Component {
  state = {
    imgSrc: null,
    imageHeight: "",
    imageWidth: "",
    croped:""
  };

  componentDidMount = ()=>{
      this.setState({imgSrc:this.props.image})
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  _crop(){
    let croped = this.refs.cropper.getCroppedCanvas().toDataURL();
    console.log(croped)
    this.setState({croped})
  }

  render() {
    return (
      <div>
       
        <Modal
          isOpen={this.props.openModal}
          toggle={this.props.onClose}
          className="lg"
          style={{ width: "100%", maxWidth: this.props.imageHeight }}
        >
          <ModalHeader toggle={this.props.onClose}>Crop Image</ModalHeader>
          <ModalBody />
          <Cropper
            ref="cropper"
            src={this.props.image}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            aspectRatio={this.props.aspectRatio || 16/9}
            guides={false}
            crop={this._crop.bind(this)}
            viewMode={2}
            // crop={this.props.handleSubmit}
          />
        
          <ModalFooter>
          <Button color="primary" onClick={()=>this.props.handleSubmit(this.state.croped)}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyCropper;
