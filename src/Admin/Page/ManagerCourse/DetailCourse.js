import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import RoadMap from "../../Components/RoadMap";
import DetailCourseTable from "../../Components/DetailCourseTable";
import InforTeacher from "../../Components/InforTeacher";
import CreateRoadMap from "../../Components/CreateRoadMapItemCourse";

function DetailCourse() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [err, setErr] = useState(false);
  const [roadMap, setRoadMap] = useState([]);

  useEffect(() => {
    const getRoadMap = async () => {
      const rm = [];
      const q = query(
        collection(db, "courseRoadMap"),
        where("IdCourse", "==", id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => rm.push(doc.data()));
      rm.sort((a, b) => a.timeCreate - b.timeCreate);
      setRoadMap(rm);
    };

    const unSub = onSnapshot(doc(db, "course", id), (doc) => {
      if (doc.exists()) {
        setCourse(doc.data());
      } else {
        setErr(true);
      }
    });

    getRoadMap();
    return () => unSub();
  }, [id]);

  return (
    <section className="bg-green-50 py-12 lg:py-20">
      {err ? (
        <h1 className="text-2xl font-bold text-red-600 text-center">
          Không tìm thấy khóa học
        </h1>
      ) : (
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {course && (
              <>
                <DetailCourseTable course={course} />
                <div className="grid grid-cols-1 gap-6 w-full">
                  <InforTeacher
                    teacher={course.teacher}
                    description={course.description}
                    IdCourse={course.id}
                  />
                </div>
                  <CreateRoadMap IdCourse={course.id} />
                <div className="space-y-4">
                  {roadMap.map((item) => (
                    <RoadMap
                      key={item.IdRoadMap}
                      IdCourse={course.id}
                      descriptionRoadMap={item.descriptionRoadMap}
                      nameRoadMap={item.nameRoadMap}
                      IdRoadMap={item.IdRoadMap}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailCourse;
