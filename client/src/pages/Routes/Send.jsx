import React, { useState, useEffect } from "react";
import axios from "../../utlis/AxiosConfiq";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
const Send = () => {
  const [mails, setMails] = useState([]);
  const [showDeleteIcon, setShowDeleteIcon] = useState(null);
  const [starredRows, setStarredRows] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const getMails = async () => {
    try {
      const { data } = await axios.get("email/inbox");
      setMails(data);
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

  const handleStarClick = (id) => {
    if (starredRows.includes(id)) {
      setStarredRows(starredRows.filter((rowId) => rowId !== id));
    } else {
      setStarredRows([...starredRows, id]);
    }
  };

  useEffect(() => {
    getMails();
  }, []);
  //   console.log(mails);
  const mailsToDisplay = mails.filter((mail) => mail.from._id === user._id);
  return (
    <div className="container mx-auto mt-8">
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded">
          <tbody>
            {mailsToDisplay.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 relative"
                onMouseEnter={() => setShowDeleteIcon(item._id)}
                onMouseLeave={() => setShowDeleteIcon(null)}
              >
                <td className="p-4">
                  <input type="checkbox" className="mr-2" />
                </td>
                <td className="p-4" onClick={() => handleStarClick(item._id)}>
                  {starredRows.includes(item._id) ? (
                    <FaStar className="text-yellow-500 cursor-pointer" />
                  ) : (
                    <FaRegStar className="text-yellow-500 cursor-pointer" />
                  )}
                </td>
                <td className="p-4">
                  <span className="font-bold">To: {item.to}</span>
                </td>
                <td>
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
  );
};

export default Send;
