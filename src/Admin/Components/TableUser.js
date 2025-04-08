import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Button, Badge } from "flowbite-react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function TableUser(props) {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [counter, setCounter] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.data().uid,
      name: doc.data().displayName || "Chưa có tên",
      email: doc.data().email,
      birthDate: doc.data().birthDate || "Chưa cập nhật",
      address: doc.data().address || "Chưa cập nhật",
      role: doc.data().role || "user",
    }));
    setUsers(data);
    setAllUsers(data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((item) => (item >= 2 ? 2 : item + 1));
    }, 1000);
    return () => {
      fetchUsers();
      clearInterval(interval);
    };
  }, [counter]);

  const handleRole = async (item) => {
    try {
      const newRole = item.role === "user" || !item.role ? "teacher" : "user";
      await updateDoc(doc(db, "users", item.id), { role: newRole });
      alert("Cập nhật vai trò thành công!");
      fetchUsers();
    } catch (error) {
      alert("Lỗi khi cập nhật vai trò, vui lòng thử lại!");
    }
  };

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc muốn xóa người dùng ${item.name} (ID: ${item.id})?`
    );
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "users", item.id));
        alert("Xóa người dùng thành công!");
        fetchUsers();
      } catch (error) {
        alert("Lỗi khi xóa, vui lòng thử lại!");
      }
    }
  };

  const handleSearch = (e) => {
    const txt = e.target.value;
    setSearchTerm(txt);
    setUsers(
      allUsers.filter(
        (item) =>
          item.name.toLowerCase().includes(txt.toLowerCase()) ||
          item.email.toLowerCase().includes(txt.toLowerCase()) ||
          item.id.toLowerCase().includes(txt.toLowerCase())
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Tìm kiếm theo tên, email hoặc ID..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-green-600 text-white">
            <tr>
              {props.columns.map((col) => (
                <th
                  key={col.field}
                  className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider"
                  style={{ width: col.width }}
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((item) => (
              <tr key={item.id} className="hover:bg-green-50 transition-colors">
                <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                  {item.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">{item.name}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {item.email}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {item.birthDate}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {item.address}
                </td>
                <td className="py-4 px-4 text-sm">
                  <Badge
                    color={
                      item.role === "admin"
                        ? "purple"
                        : item.role === "teacher"
                        ? "green"
                        : "gray"
                    }
                  >
                    {item.role}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-sm">
                  <div className="flex gap-2">
                    {item.role !== "admin" && (
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => handleRole(item)}
                      >
                        Đặt{" "}
                        {item.role === "user" || !item.role
                          ? "Teacher"
                          : "User"}
                      </Button>
                    )}
                    {currentUser.uid !== item.id && (
                      <>
                        <Button
                          size="sm"
                          color="blue"
                          onClick={() => navigate(`/ProfileOrther/${item.id}`)}
                        >
                          Chi Tiết
                        </Button>
                        <Button
                          size="sm"
                          color="failure"
                          onClick={() => handleDelete(item)}
                        >
                          Xóa
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
