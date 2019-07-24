import React from 'react';
import {Form, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import MyProfile from './MyProfile';
import ButtonComponent from '../PersonalHealthRecord/ButtonComponent';

class AccountSetting extends React.Component{

  render(){
    return(
      <div>
        <MyProfile/>
        <Form>
          <Row>
            <Col xs="12" md={{size:4}}>
              <FormGroup>
                <Label>Email Id</Label>
                <Input type="email" name="email"></Input>
              </FormGroup>
            </Col>
            <Col xs="12" md={{size:4}}>
              <FormGroup>
                <Label>Phone No.</Label>
                <Input type="text" name="phone"></Input>
              </FormGroup>
            </Col>
            <Col xs="12" md={{size:4}}>
              <FormGroup>
                <Label>Additional Phone No.(Optional)</Label>
                <Input type="text"></Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <ButtonComponent/>
      </div>
    );
  }
}


export default AccountSetting;
