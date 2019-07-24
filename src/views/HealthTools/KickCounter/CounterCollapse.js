import React from 'react';
import {Col, Collapse, ListGroupItem, Row} from "reactstrap";
import KickcounterTable from "./KickcounterTable";


class CounterCollapse extends  React.Component{


  render(){
    let {index , data} = this.props
    return(
      <div key={index}>
        <ListGroupItem
          onClick={this.props.toggle}
          style={{ cursor: "pointer" }}
          key={index}
        >
          <Row key={index}>
            <Col md={{ size: 3 }}>
              Date:{data.currentDate}
            </Col>
            <Col md={{ size: 3, offset: 5 }}>
              Total Kicks: {this.props.totalKicks(data.subdata)}
            </Col>
            <Col md={{ size: 1 }}>
              <i
                className={this.props.isActive? "icon-arrow-down": "icon-arrow-left"}
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
          <div>
            <Collapse
              isOpen={this.props.isActive}
            >
              <KickcounterTable subdata={data.subdata} />
            </Collapse>
          </div>
        </ListGroupItem>
      </div>
    )
  }
}


export default  CounterCollapse
