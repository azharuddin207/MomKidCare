import React, { Component } from "react";
import myaccount from "../../assets/img/dashboard/myaccount.png";
// import help from "../../assets/img/dashboard/help.png";
import myphr from "../../assets/img/dashboard/myphr.png";
import blogs from "../../assets/img/dashboard/blogs.png";
import mybookings from "../../assets/img/dashboard/mybookings.png";
import health from "../../assets/img/dashboard/health.png";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row mt-3">
          <Link to="/profile" className="col-md-3 col-sm-6 col-12">
            <div className="text-center dashboardCard card p-3">
              <img style={{ margin: "0 auto" }} src={myaccount} alt="" />
              <h6
                className="text-center mt-3"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                My Account
              </h6>
            </div>
          </Link>

          <Link to="/servicebooking" className="col-md-3 col-sm-6 col-12">
            <div className="text-center dashboardCard card p-3">
              <img style={{ margin: "0 auto" }} src={mybookings} alt="" />
              <h6
                className="text-center mt-3"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                My Bookings
              </h6>
            </div>
          </Link>

          <Link to="/personalhealthrecord" className="col-md-3 col-sm-6 col-12">
            <div className="text-center dashboardCard card p-3">
              <img style={{ margin: "0 auto" }} src={myphr} alt="" />
              <h6
                className="text-center mt-3"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                My Personal Health Record
              </h6>
            </div>
          </Link>

          <Link to="/ovulationcalculator" className="col-md-3 col-sm-6 col-12">
            <div className="text-center dashboardCard card p-3">
              <img style={{ margin: "0 auto" }} src={health} alt="" />
              <h6
                className="text-center mt-3"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                Health Tools
              </h6>
            </div>
          </Link>

          <Link to="/blog/addblogpost" className="col-md-3 col-sm-6 col-12">
            <div className="text-center dashboardCard card p-3">
              <img style={{ margin: "0 auto" }} src={blogs} alt="" />
              <h6
                className="text-center mt-3"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                My Blogs
              </h6>
            </div>
          </Link>

        </div>
      </div>
    );
  }
}

export default Dashboard;
