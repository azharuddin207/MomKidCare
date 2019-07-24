import React from 'react';
import { Form, FormGroup, Input, Row, Col} from 'reactstrap';
import PregnancyvitalsBloodsugar from './AddBloodsugar';
import PregnancyvitalsThroid from './AddThyroid'
import PregnancyvitalsBloodpressure from './AddBloodpresssure'



// const desease = ["thyroid", "bloodPressure", "bloodSugar"]
class AddPregnancyvitals extends React.Component {
  state = {
    deseaseType: "Thyroid"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleForm = deseaseType => {
    if (deseaseType === "Thyroid") {
      return <PregnancyvitalsThroid deseaseType={this.state.deseaseType} />;
    }
    if (deseaseType === "Blood Sugar") {
      return <PregnancyvitalsBloodsugar deseaseType={this.state.deseaseType} />;
    }
    if (deseaseType === "Blood Pressure") {
      return (
        <PregnancyvitalsBloodpressure deseaseType={this.state.deseaseType} />
      );
    }
  };

  //   handleClick = (data, files) =>{
  //           console.log(data)
  //           if(data=== null || files===undefined){
  //             return false
  //           }
  //           const formdata = new FormData();
  //           for(let key in data){
  //                 formdata.append(key,data[key])
  //           }
  //           formdata.append("deseaseType", this.state.deseaseType)
  //           for(let i=0; i<files.length; i++){
  //               formdata.append(files[i])
  //           }

  //           const config = {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data'
  //             }
  //           };
  //           Axios.post(baseURL+`users/thyroid`, config, formdata)
  //           .then((res)=>{
  //             console.log(res)
  //           }).catch((err)=>{
  //             console.log(err)
  //           })
  // }

  render() {
    const { deseaseType } = this.state;
    return (
      <div>
        <Form>
          <Row className="mt-3">
            <Col xs="12" className="col-md-4">
              <FormGroup>
                <Input
                  type="select"
                  name="deseaseType"
                  onChange={this.handleChange}
                >
                  <option>Thyroid</option>
                  <option>Blood Sugar</option>
                  <option>Blood Pressure</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {this.handleForm(deseaseType)}
      </div>
    );
  }
}

export default AddPregnancyvitals;
