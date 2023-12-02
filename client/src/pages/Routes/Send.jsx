import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "../../utlis/AxiosConfiq";

const Send = () => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(null);
  const [emails, setEmails] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleStarClick = async (id) => {
    try {
      const updatedEmails = emails.map((email) =>
        email._id === id ? { ...email, starred: !email.starred } : email
      );

      setEmails(updatedEmails);

      await axios.put("email/starred", {
        emailId: id,
        isStarred: !emails.find((email) => email._id === id)?.starred,
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
        setEmails(data);
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
    getMails();
  }, []);

  const deleteClicked = async (id) => {
    try {
      const isBin = true;
      await axios.put("email/bin", { emailId: id, isBin });
      const updatedEmails = emails.filter((mail) => mail._id !== id);
      setEmails(updatedEmails);
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

  const mailsToDisplay =
    emails?.filter((mail) => mail?.from._id === user?._id) &&
    emails?.filter((mail) => mail.bin === false);

  return (
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
                <td className="p-4" onClick={() => handleStarClick(item?._id)}>
                  {item.starred ? (
                    <FaStar className="text-yellow-500 cursor-pointer" />
                  ) : (
                    <FaRegStar className="text-yellow-500 cursor-pointer" />
                  )}
                </td>
                <td className="p-4">
                  <span className="font-bold">To: {item?.to}</span>
                </td>
                <td>
                  <span className="block text-gray-800 font-semibold">
                    {item.subject} -{" "}
                    {item.body.split(" ").slice(0, 10).join(" ")}
                    ...
                  </span>
                </td>
                {showDeleteIcon === item._id && (
                  <td
                    className="absolute right-0 p-4"
                    onClick={() => deleteClicked(item?._id)}
                  >
                    <FaTrash className="text-red-600 cursor-pointer" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Send;
