import {
    collection,
    doc,
    getDocs,
    limit,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import React, { useEffect, useState } from "react";
  import { db } from "../../firebase";
  import { Button, Badge } from "flowbite-react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTwitter, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
  
  function InforTeacher({ teacher: teacherId, IdCourse, description: initialDescription }) {
    const [teacher, setTeacher] = useState(null);
    const [description, setDescription] = useState(initialDescription);
    const [err, setErr] = useState(false);
  
    useEffect(() => {
      const getTeacher = async () => {
        const q = query(collection(db, "users"), where("id", "==", teacherId), limit(1));
        const t = await getDocs(q);
        if (!t.empty) {
          setTeacher(t.docs[0].data());
        } else {
          setErr(true);
        }
      };
      getTeacher();
    }, [teacherId]);
  
    const handleInput = (e) => setDescription(e.target.value);
  
    const handleUpdateDoc = async () => {
      try {
        await updateDoc(doc(db, "course", IdCourse), { description });
        alert("Cập nhật mô tả thành công!");
      } catch (error) {
        alert("Lỗi khi cập nhật, vui lòng thử lại!");
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        {err ? (
          <h2 className="text-red-600 font-semibold text-center">Không tìm thấy giảng viên</h2>
        ) : teacher ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Teacher Profile Section */}
            <div className="flex flex-col items-center lg:w-1/3">
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={teacher.photoURL || "https://placekitten.com/200/200"}
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-green-200 object-cover shadow-md"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 text-center">{teacher.displayName}</h2>
              <Badge color="green" className="mt-2">
                Giảng viên
              </Badge>
              <div className="flex gap-4 mt-4">
                <a href="/" className="text-green-600 hover:text-green-800 transition-colors">
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a href="/" className="text-green-600 hover:text-green-800 transition-colors">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                <a href="/" className="text-green-600 hover:text-green-800 transition-colors">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
              <div className="mt-4 text-center text-gray-600">
                <p>Email: {teacher.email || "Chưa cập nhật"}</p>
                <p>ID: {teacher.id}</p>
              </div>
            </div>
  
            {/* Course Description Section */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-green-700 mb-4">Mô tả khóa học</h3>
              <textarea
                value={description}
                onChange={handleInput}
                rows="8"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-none shadow-sm"
                placeholder="Nhập mô tả khóa học..."
              />
              <Button
                onClick={handleUpdateDoc}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
              >
                Cập nhật mô tả
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">Đang tải thông tin giảng viên...</p>
        )}
      </div>
    );
  }
  
  export default InforTeacher;