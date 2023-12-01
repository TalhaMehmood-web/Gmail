import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "../utlis/AxiosConfiq";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Compose = () => {
  //api data
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const user = useSelector((state) => state.auth.user);
  //UI states
  const [openModal, setOpenModal] = useState(false);
  const [placeholder, setPlaceholder] = useState(false);
  const [boldClicked, setBoldClicked] = useState(false);
  const [icon, setIcon] = useState(false);

  const handleInput = () => {
    setPlaceholder(!placeholder);
  };
  const Bold = () => {
    setBoldClicked(!boldClicked);
    setIcon(!icon);
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setOpenModal(false);
    try {
      const mailData = {
        to,
        subject,
        body,
        userId: user?._id,
      };
      const { data } = await axios.post(`email/send-email`, mailData);
      if (data) {
        toast.success("Email Sended Successfully", {
          position: "top-center",
          autoClose: 1100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTo("");
        setSubject("");
        setBody("");
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 1100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="text-black px-4 py-3 bg-[#e1edff] shadow-sm border-none flex items-center  font-semibold hover:bg-white rounded-full"
      >
        <span className="material-symbols-outlined mr-3">edit</span>
        <p className="text-lg">Compose</p>
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        size={"7xl"}
        className=""
      >
        <Modal.Header className="py-2 bg-gray-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white py-0">
            New Message
          </h2>
        </Modal.Header>
        <div className="px-2">
          <div className="space-y-4 ">
            <div className="flex items-center border-b">
              <input
                type="text"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
                className=" p-2 border-none rounded-md w-full outline-none "
                placeholder={`${placeholder ? "To" : "Recipient's email"}`}
                onClick={handleInput}
              />
            </div>

            <div className="flex items-center border-b">
              <input
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                className=" p-2 border-none rounded-md w-full outline-none "
                placeholder="Subject"
              />
            </div>
            <textarea
              className={`mt-1 p-2 border-transparent outline-none hover:border-transparent rounded-md w-full ${
                boldClicked && "font-extrabold"
              }`}
              rows="15"
              placeholder="Your message..."
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </div>
        </div>
        <Modal.Footer>
          <Button
            className="bg-blue-700 focus:bg-blue-600"
            onClick={(e) => {
              sendMail(e);
            }}
          >
            Send
          </Button>
          <div>
            <span
              className={`material-symbols-outlined  cursor-pointer font-3xl  rounded-md p-2  ${
                icon
                  ? " bg-gray-200 text-black "
                  : "bg-transparent text-gray-600"
              }`}
              onClick={Bold}
            >
              format_bold
            </span>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Compose;
