import React from 'react';
import {Link} from 'react-router-dom';


class MyProfile extends React.Component{
  render(){
    return(
      <div className="mb-3 row">
        <div className="text-center col-lg-2">
          <img
            className="account-image mb-2"
            src="https://pbs.twimg.com/profile_images/1131946474537750528/AQl6zofd.jpg"
            alt=""
          />
          <p className="account-image-link">Edit</p>
        </div>
        <div className="col-lg-10 mt-4">
          <h4
            style={{
              fontWeight: 700,
              color: "#555555",
              marginBottom: 0,
              paddingBottom: 0
            }}
          >
            Aviral Shrivastava
          </h4>
          <p
            style={{
              marginTop: 0,
              paddingTop: 0,
              marginBottom: 0,
              paddingBottom: 0
            }}
          >
            account created for: spouse{" "}
            <Link className="account-image-link ml-4" to="">
              Edit
            </Link>
          </p>
          <p style={{ marginTop: 0, paddingTop: 0 }}>
            Life stage: Trying to concieve{" "}
            <Link className="account-image-link ml-4" to="">
              Edit
            </Link>
          </p>
        </div>
      </div>
    )
  }
}

export default MyProfile
