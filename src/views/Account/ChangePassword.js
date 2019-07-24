import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./Account.css";
// import axios from "axios";
// import baseURL from "../../Categories/Service/Index";
// import cookie from "react-cookies";
// import swal from "sweetalert";

class AccountSettings extends React.Component {
  render() {
    return (
      <div className="mt-4">
        <h4
          className="text-center"
          style={{ color: "#535771", fontWeight: 700 }}
        >
          Change Password
        </h4>
        <div
          className="col-5 account-card card p-5"
          style={{ margin: "2em auto" }}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="examplePassword">Enter Old Password</Label>
              <Input
                type="password"
                name="oldpassword"
                placeholder="Enter Old password"
                onChange={this.changeHandler}
                //   value={oldpassword}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Enter New Password</Label>
              <Input
                type="password"
                name="newpassword"
                placeholder="Enter new password"
                onChange={this.changeHandler}
                //   value={newpassword}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Confirm New Password</Label>
              <Input
                type="password"
                name="confirmpassword"
                placeholder="confirm password"
                onChange={this.changeHandler}
                //   value={confirmpassword}
              />
            </FormGroup>
          </Form>
        </div>

        <div className="text-center mt-4 pb-5">
          <Button className="btn text-center" style={{ width: "108px" }}>
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
      </div>
    );
  }
}

export default AccountSettings;
