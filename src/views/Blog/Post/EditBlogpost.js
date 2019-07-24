import React from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import Dropzone from 'react-dropzone';
import Cropper,{acceptedFileTypesArray,verifyImage} from "../../../containers/Cropper";
import { Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import ButtonComponent from "../../PersonalHealthRecord/ButtonComponent";
import  {getImgSrc} from '../../../views/functions'
import Axios from 'axios';
import baseURL from  '../../../config'

import swal from "sweetalert";
import  MultiSelectReact  from 'multi-select-react';
import {Redirect} from 'react-router-dom'
class EditBlogPost extends React.Component {
  state = {
    title: "",
    summary: "",
    tagId:[],
    categoryId:[],
    slug: "",
    remarks:'',
    imagePreviewUrl: "",
    tags:[],
    categories:[],
    base64url:"/assets/img/emptyimage.png",
    modal:false,
    redirect:false,
    selectedCategory:""
  };



  handleTitleChange = (e) => {
    let slug = e.target.value.split(" ").join("-");
    this.setState({
      ...this.state,
      title: e.target.value,
      slug: slug
    });
  };



  componentDidMount() {
    console.log(this.props.match.params.id)
    let id=this.props.match.params.id;
    let imgsrc = baseURL.split("/")[0] + "/" + baseURL.split("/")[1] + "/" + baseURL.split("/")[2];
    Axios.get(baseURL + `users/blogs/${id}`).then((res)=>{
      console.log(res.data.data.blogpost)
      let {summary, tagId, categoryId, title, slug,featured_image, remarks} = res.data.data.blogpost
      // let  bytes = utf8.encode(featured_image);
      // let base64url = base64.encode(bytes);
      this.setState({summary, tagId, categoryId, title, base64url:imgsrc+featured_image, slug, remarks})
    })
      .catch((err)=>{
        console.log(err)
      })


    Axios.get(baseURL + `users/blogs/tags`)
      .then((res)=>{
        // console.log(res.data)
        let y= res.data.tag.map((item)=>{
          return {id:item._id,label:item.name}
        })
        this.setState({tags:y})
      }).catch((err)=>{
      console.log(err)
    })

    Axios.get(baseURL+`users/blogs/categories`)
      .then((res)=> {
        let x = res.data.category.map((item)=>{
          return {id:item._id,label:item.name}
        })

        // console.log(res.data.categories)
        // console.log(x)

        this.setState({categories: x})
        // console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })






  }


  _toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleImageCroppedImage = url => {
    this._toggleModal();
    this.setState({
      base64url: url
    });
  };





  handleOnDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyImage(rejectedFiles);
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      const isVerified = verifyImage(acceptedFiles);
      if (isVerified) {
        // alert("Your Image Accepted");

        const currentFile = acceptedFiles[0];

        let img = await getImgSrc(currentFile, { height: 400, width: 400});


        if (!img || img.error) {
          alert(img.message);
        } else {
          this.setState({
            imagePreviewUrl : img.base64Content,
            modal: true
          });
        }
      }
    }
  };



  handleDropdown = (key, objKey, values, selectedKey) => {
    const selected = values.map(item => {
      return { [objKey]: item["value"] };
    });

    this.setState({
      [key]: selected,
      [selectedKey]: values
    });
  };





  changeHandler = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };



  handleFileChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        base64: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };


  selectedTagClicked(optionsList){
    let x =  optionsList.filter((item)=>{
      if(item.value){
        return true;
      }
    })
    const selectedTag = x.map((item)=>{
      return {tag: item.id}
    })

    this.setState({tagId:selectedTag})
    return selectedTag
  }


  tagClicked(optionsList){
    let x =  optionsList.filter((item)=>{
      if(item.value){
        return true;
      }
    })
    const selectedTag = x.map((item)=>{
      return {tag: item.id}
    })

    this.setState({tagId:selectedTag})
    return selectedTag
  }





  categoryClicked(optionsList) {
    let x =  optionsList.filter((item)=>{
      if(item.value){
        return true;
      }
    })
    const selectedCategories = x.map((item)=>{
      return {categories:item.id}
    })

    this.setState({categoryId: selectedCategories})

  }
  selectedCategoryClicked(optionsList) {
    let x =  optionsList.filter((item)=>{
      if(item.value){
        return true;
      }
    })



    // console.log(selectedTag, "azhar")

    const selectedCategories = x.map((item)=>{
      return {categories:item.id}
    })


    this.setState({categoryId: selectedCategories})
    // console.log(selectedCategories,'sdfdd')

    // this.setState({ multiSelect: optionsList });
  }






  handleClick = () => {
    console.log(this.state)
    const { summary, tagId, title, categoryId, base64url , remarks, slug} = this.state;
    let data= {summary, tagId, title, categoryId, base64url , remarks, slug}
    // const formdata = new FormData();
    // formdata.append("tagId", tagId);
    // formdata.append("categoryId", categoryId)
    // for(let key in values ){
    //   formdata.append(key,values[key])
    // }
    // formdata.append('base64url', base64url)
    Axios.put(baseURL+`users/blogs`,  data)
      .then((res)=>{
        console.log(res)
        this.setState({redirect:res.status})
        swal("Post updated successfully,", "", "success");
      })
      .catch(err=>{
        console.log(err);
        // toast.error('upload fail')
      })
  };








  render() {
    if(this.state.redirect) {
      return <Redirect to="/post"/>
    }

    const selectedOptionsStyles = {
      color: "#3c763d",
      backgroundColor: "#dff0d8"
    };
    const optionsListStyles = {
      backgroundColor: "#fcf8e3",
      color: "#8a6d3b"
    };
    let {
      imagePreviewUrl,
      summary,
      title,
      tags,
      categories,
      slug,
      remarks,
      base64url,
      modal,
    } = this.state;
    // console.log(this.state)

    return (
      <div className="p-3">
        <Form>
          <Row form>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>
                  Blog Title<span className="asterisc">*</span>
                </Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter Blog title"
                  value={title}
                  onChange={this.handleTitleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>
                  Blog Slug<span className="asterisc">*</span>
                </Label>
                <Input
                  type="text"
                  name="slug"
                  value={slug}
                  placeholder="Enter Blog slug"
                  onChange={this.changeHandler}
                  required
                />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Tag</Label>
                <span className={"text-danger"}>*</span>
                <MultiSelectReact
                  options={tags}
                  optionClicked={this.tagClicked.bind(this)}
                  selectedBadgeClicked={this.selectedTagClicked.bind(this)}
                  selectedOptionsStyles={selectedOptionsStyles}
                  optionsListStyles={optionsListStyles} />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>Blog Category </Label>
                <span className={"text-danger"}>*</span>
                <MultiSelectReact
                  options={categories}
                  optionClicked={this.categoryClicked.bind(this)}
                  selectedBadgeClicked={this.selectedCategoryClicked.bind(this)}
                  selectedOptionsStyles={selectedOptionsStyles}
                  optionsListStyles={optionsListStyles} />
              </FormGroup>
            </Col>
            <Col xs="12" md={{ size: 4 }}>
              <FormGroup>
                <Label>
                  Remarks<span className="asterisc">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Remarks"
                  name="remarks"
                  onChange={this.changeHandler}
                  value={remarks}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row md={{ size: 12 }} form>
            <Col xs="12" md={{ size: 12 }}>
              <Label>Blog summary</Label>
              <ReactQuill
                required
                className="quill"
                bounds={".app"}
                value={summary}
                modules={this.modules}
                onChange={value => this.setState({ summary: value })}
              />
            </Col>
          </Row>
          <Row className="mt-3" form>
            <Col sm="12" md={{ size: 4, offset: 4 }}>
              <FormGroup>
                <Label className="ml-lg-5">Upload</Label>
                <span className="text-danger"> *</span>
                <Dropzone
                  accept={acceptedFileTypesArray}
                  onDrop={this.handleOnDrop}
                  maxSize={8388608}
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <img src={base64url} className="img-fluid" />
                      </div>
                    </section>
                  )}
                </Dropzone>
              </FormGroup>
              <Cropper
                openModal={modal}
                image={imagePreviewUrl}
                onClose={this._toggleModal}
                handleSubmit={this.handleImageCroppedImage}
              />

            </Col>
          </Row>
          <FormGroup check>
            <Label check>
              <Input type="checkbox"/> Disclaimer
            </Label>
          </FormGroup>
        </Form>
        <Row>
          <Col xs="12" md={{ size: 4, offset: 4 }}>
            <ButtonComponent handleClick={this.handleClick} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditBlogPost;
