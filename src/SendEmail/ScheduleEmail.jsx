import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiPaperAirplane } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { Link, useNavigate, Navigate } from "react-router-dom";

import "./SendEmail.css";
const SendEmail = () => {
  const [present_user, setPresentUser] = useState({});

  const logouthandler = (e) => {
    localStorage.removeItem(`token`);
  };

  const [schedulemail_details, setSchedule_details] = useState({
    email_title: "",
    email_subject: "",
    email_content: "",
    created_At: "",
    email_list: "",
    Send_Timestamp: "",
  });
  const {
    email_title,
    email_subject,
    email_content,
    created_At,
    email_list,
    Send_Timestamp,
  } = schedulemail_details;

  const schedulemail_onchangehandler = (e) => {
    setSchedule_details((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const schedulemail_submithanndler = (e) => {
    e.preventDefault();

    axios
      .post(
        `https://bulkemailtool-backend-1d7l.onrender.com/schedulemail`,
        schedulemail_details
      )
      .then((res) => {
        alert(res.data);
      });
  };
  useEffect(() => {
    axios
      .get(`https://bulkemailtool-backend-1d7l.onrender.com/myprofile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => setPresentUser(res.data));
  }, []);

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="sendEmail-section">
      <div className="navbar-section">
        <div className="navbar flex justify-between">
          <div className="left-nav-section flex items-center">
            <div className="logoname">maillaunch</div>
            <div className="iconlogo">
              <HiPaperAirplane className="icon" />
            </div>
          </div>
          <div className="right-nav-section flex items-center">
            <div className="signup flex items-center">
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className=" flex items-center">
              <Link to="/sendmail">Send Email</Link>
            </div>
            <div className="login flex items-center" onClick={logouthandler}>
              <Link to="/login">LogOut</Link>
              <BiLogOut className="" />
            </div>
          </div>
        </div>
      </div>
      <div className="schedule-content flex justify-center items-center mt-4">
        <div className="schedulemail_form w-96">
          <div className="schedule_header text-xl font-bold text-center">
            Schedule mail
          </div>
          <form
            action=""
            className="flex flex-col"
            onSubmit={schedulemail_submithanndler}
          >
            <input
              type="text"
              placeholder="Email Title"
              name="email_title"
              value={email_title}
              onChange={schedulemail_onchangehandler}
            />
            <input
              type="text"
              placeholder="Email Subject"
              name="email_subject"
              value={email_subject}
              onChange={schedulemail_onchangehandler}
            />
            <textarea
              type="text"
              placeholder="Email Body"
              name="email_content"
              value={email_content}
              onChange={schedulemail_onchangehandler}
            />
            <textarea
              type="text"
              placeholder="Enter the recepient details seperated by commas(,)"
              name="email_list"
              value={email_list}
              onChange={schedulemail_onchangehandler}
            />
            <input
              type="datetime-local"
              name="Send_Timestamp"
              value={Send_Timestamp}
              onChange={schedulemail_onchangehandler}
            />
            <button className="btnnn bg-blue-500">Schedule </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
