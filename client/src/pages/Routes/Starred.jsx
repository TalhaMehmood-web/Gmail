import React, { useState, useEffect } from "react";
import axios from "../../utlis/AxiosConfiq";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
const Starred = () => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const [mails, setMails] = useState([]);
  const handleStarClick = async (id) => {
    try {
      const updatedEmails = mails.map((email) =>
        email._id === id ? { ...email, starred: !email.starred } : email
      );

      setMails(updatedEmails);

      await axios.put("email/starred", {
        emailId: id,
        isStarred: !mails.find((email) => email._id === id)?.starred,
      });
    } catch (error) {
      toast.error(`${error.response?.data?.message}`, {
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
  useEffect(() => {
    const getMails = async () => {
      try {
        const { data } = await axios.get("email/inbox");
        setMails(data);
      } catch (error) {
        throw error;
      }
    };
    getMails();
  }, []);

  const mailsToDisplay = mails.filter((mail) => mail.starred === true);
  return (
    <div>
      {" "}
      <div className="container mx-auto mt-8">
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded">
            <tbody>
              {mailsToDisplay?.map((item) => (
                <tr
                  key={item?._id}
                  className="border-b hover:bg-gray-100 relative"
                  onMouseEnter={() => setShowDeleteIcon(item?._id)}
                  onMouseLeave={() => setShowDeleteIcon(null)}
                >
                  <td className="p-4">
                    <input type="checkbox" className="mr-2 cursor-pointer" />
                  </td>
                  <td
                    className="p-4"
                    onClick={() => handleStarClick(item?._id)}
                  >
                    {item.starred ? (
                      <FaStar className="text-yellow-500 cursor-pointer" />
                    ) : (
                      <FaRegStar className="text-yellow-500 cursor-pointer" />
                    )}
                  </td>
                  <td className="p-4">
                    <span className="font-bold">
                      {item?.from.email === user?.email
                        ? "me"
                        : item?.from.name}
                    </span>
                  </td>
                  <td>
                    {item?.from.email !== user?.email && (
                      <span className="border border-blue-gray-300 bg-gray-100 px-2 rounded-md">
                        Inbox
                      </span>
                    )}
                    <span className="block text-gray-800 font-semibold">
                      {item.subject} -{" "}
                      {item.body.split(" ").slice(0, 10).join(" ")}
                      ...
                    </span>
                  </td>
                  {showDeleteIcon === item._id && (
                    <td className="absolute right-0 p-4">
                      <FaTrash className="text-red-600 cursor-pointer" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Starred;
