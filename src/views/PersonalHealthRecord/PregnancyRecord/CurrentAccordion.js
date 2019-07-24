import React from 'react';
import {ListGroupItem, Collapse, Col, Row, Table} from 'reactstrap';
import {Link} from "react-router-dom";



class CurrentAccordion extends  React.Component{

  state = {
    currentIndex:'',
    isShow:''
  }



  handleDelete = (data, _id) =>{
    console.log(_id)
    console.log(data)
    console.log('click')
    data.documentDetails.filter(d=> d._id!==_id)
  }

  render(){
    let {data, index}= this.props;
    console.log(index)
    return (
      <div>
        <ListGroupItem
          onClick={this.props.toggle}
          style={{ cursor: "pointer" }}
          key={index}
        >
          <Row key={index}>
            <Col md={{ size: 3 }}>Pregnancy Stage: {data.week}</Col>
            <Col md={{ size: 1, offset: 7 }}>
              <i className="shareRecord fa fa-share-square  col-3" />
            </Col>
            <Col md={{ size: 1 }}>
              <i
                className={
                  this.props.isActive
                    ? "icon-arrow-down"
                    : "icon-arrow-left"
                }
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>


        </ListGroupItem>
        <Collapse
          isOpen={
            this.props.isActive
          }
        >
          <Table responsive>
            <thead style={{backgroundColor:"#F0F0F0"}}>
            <tr>
              <th>S.No</th>
              <th>Date of Appointment</th>
              <th>Hospital/Clinic</th>
              <th>Doctor Name</th>
              <th>Types of Document(s)</th>
              <th>Title of Document(s)</th>
              <th>File Uploaded</th>
              <th colSpan={2}>Actions</th>
            </tr>
            </thead>
            {data.record.map((data) => {
              return (
                data.documentDetails.map((d, i)=>{
                  return(
                    <tbody key={i}>
                    <tr key={i}>
                      <td style={{width:"10%"}}>{i + 1}.</td>
                      <td style={{width:"10%"}}>
                        {new Date(d.appointmentDate).getDate() +
                        "-" +
                        new Date(d.appointmentDate).getMonth() +
                        "-" +
                        new Date(d.appointmentDate).getFullYear()}</td>
                      <td style={{width:"10%"}}>{data.hospitalName}</td>
                      <td style={{width:"10%"}}>{data.gynecologistName}</td>
                      <td style={{width:"10%"}}>{d.documentType}</td>
                      <td style={{width:"10%"}}>{d.title}</td>
                      <td style={{width:"10%"}}>uploaded</td>
                      <td style={{width:"15%"}}>
                        <i className="shareRecord fa fa-share-square ml-sm-3" />
                        <Link to={`/editpregnancyrecord/${d._id}`} className="col-4">
                          <i className="editDiary fa fa-pencil" />
                        </Link>
                        {/*<Link >*/}
                        <i className="downloadRecord fa fa-download ml-sm-3" />
                        {/*</Link>*/}
                        <i className="deleteRecord fa fa-trash ml-sm-3"
                           onClick={()=> this.handleDelete(data, d._id)}
                        />
                      </td>
                    </tr>
                    </tbody>
                  )
                })
              );
            })}
          </Table>
        </Collapse>
      </div>
    );
  }

}


export  default  CurrentAccordion
