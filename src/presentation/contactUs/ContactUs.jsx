import { Component } from "react";
import NavBar from "../../components/NavBar";
import { getUserDetail } from "../../js/auth";
import { sendContactMail } from "../../js/sendMail";
import Footer from "../home/Footer";
import { toast } from 'react-toastify';
import trackFB from "../../js/trackFB";


class ContactUs extends Component {
  render() {
    return (
      <div>
        <section className="contactUs">
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <div className="contact-form-cont">
          <div className="contact-form">
            <h1>Contact Us</h1>
            <p>Share your query with us and we will be in touch with you.</p>
            <br />
            <div className="form-input">
              <label htmlFor="query">
                <span>Your Query:</span> <br />
                <textarea type="text" name="query" id="cquery" />
              </label>{" "}
            </div>
            <br />
            <div className="center">
              <input
                onClick={async function () {
                  trackFB("Contact", {});
                  var udet = await getUserDetail();
                  if (udet.success) {
                    var query = document.getElementById("cquery").value;
                    if (query === "") {
                      toast.error("Please enter your query");
                    } else {
                      var subject = `Your query was submitted successfully.`;
                      var made = await sendContactMail(subject, query);
                      if (made.success) {
                        toast.success('Your query has been sent successfully')
                      } else {
                        toast.error('Something went wrong')
                      }
                    }
                  } else {
                    toast.error("Please login to send query")
                  }
                }}
                type="button"
                value="Submit"
              />
            </div>
            <br />
          </div>
        </div>
       
      </section>
      <Footer/>
      </div>
    );
  }
}

export default ContactUs;
