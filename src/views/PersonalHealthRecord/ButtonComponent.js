import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

class ButtonComponent extends React.Component {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="text-center mt-5 pb-5">
        <Button
          className="btn text-center col-md-6 xs-12"
          style={{ width: "100px" }}
          onClick={this.props.handleClick}
        >
          Save
        </Button>
        <Button
          className="btn text-center ml-4 discardButton col-md-6 xs-12"
          style={{ width: "100px" }}
          onClick={this.goBack}
        >
          Discard
        </Button>
      </div>
    );
  }
}

export default withRouter(ButtonComponent);
