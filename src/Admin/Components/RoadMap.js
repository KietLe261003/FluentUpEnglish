import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { Button } from "flowbite-react";
import CreateActive from "./CreateActive";
import UpdateActive from "./UpdateActive";
import UpdateRoadMap from "./UpdateRoadMap";
import { deleteObject, ref } from "firebase/storage";

function RoadMap({ IdCourse, IdRoadMap, nameRoadMap, descriptionRoadMap }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [roadMap, setRoadMap] = useState([]);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((item) => (item >= 2 ? 2 : item + 1));
    }, 1000);
    const getRoadMap = async () => {
      const dt = [];
      const q = query(
        collection(db, "active"),
        where("idRoadMap", "==", IdRoadMap)
      );
      const rm = await getDocs(q);
      rm.forEach((it) => dt.push(it.data()));
      dt.sort((a, b) => a.timeCreate - b.timeCreate);
      setRoadMap(dt);
    };
    getRoadMap();
    return () => clearInterval(interval);
  }, [IdRoadMap, counter]);

  const handleDelete = async (id, idRoadMap) => {
    const choice = window.confirm(
      `Bạn có chắc muốn xóa hoạt động "${id}" không?`
    );
    if (choice) {
      try {
        const activeDoc = doc(db, "active", id);
        const getActive = await getDoc(activeDoc);
        const qd = query(
          collection(db, "detailActive"),
          where("IdActive", "==", id)
        );
        const deleteDetail = await getDocs(qd);

        await Promise.all(
          deleteDetail.docs.map(async (item) => {
            if (item.exists()) {
              await deleteDoc(doc(db, "detailActive", item.data().id));
            }
          })
        );

        await deleteDoc(activeDoc);

        if (getActive.data().type === 1) {
          const desertRef = ref(
            storage,
            `Video/${IdCourse}/${idRoadMap}/${id}`
          );
          await deleteObject(desertRef);
          const docCourse = await getDoc(doc(db, "course", IdCourse));
          const sumActive = docCourse.data().sumActive - 1;
          await updateDoc(doc(db, "course", IdCourse), { sumActive });
        }

        window.location.reload();
      } catch (error) {
        alert("Lỗi trong quá trình xóa, vui lòng thử lại!");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-4">
      <button
        onClick={() => setDropdownOpen(!isDropdownOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-green-50 transition-colors border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <FontAwesomeIcon
            icon={faChalkboard}
            className="h-8 w-8 text-green-600"
          />
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800">
              {nameRoadMap}
            </h3>
            <p className="text-sm text-gray-600">{descriptionRoadMap}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UpdateRoadMap
            IdCourse={IdCourse}
            roadMap={IdRoadMap}
            nameRoadMap={nameRoadMap}
            descriptionRoadMap={descriptionRoadMap}
          />
          <FontAwesomeIcon
            icon={isDropdownOpen ? faChevronUp : faChevronDown}
            className="h-5 w-5 text-gray-600"
          />
        </div>
      </button>
      {isDropdownOpen && (
        <div className="p-4 space-y-2">
          {roadMap.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 border border-gray-200"
            >
              <span className="text-gray-700">{it.nameActive}</span>
              <div className="flex gap-2">
                <UpdateActive
                  activeUpdate={it}
                  IdCourse={IdCourse}
                  nameRoadMap={nameRoadMap}
                />
                <Button
                  size="sm"
                  color="failure"
                  onClick={() => handleDelete(it.id, it.idRoadMap)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))}
          <CreateActive
            IdCourse={IdCourse}
            IdRoadMap={IdRoadMap}
            nameRoadMap={nameRoadMap}
          />
        </div>
      )}
    </div>
  );
}

export default RoadMap;
