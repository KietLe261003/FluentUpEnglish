import React from "react";
import { Badge } from "flowbite-react";

function DetailCourseTable({ course }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-green-600 text-white">
          <tr>
            {[
              "ID",
              "Tiêu đề",
              "Thời gian học",
              "Loại khóa học",
              "Thời gian bắt đầu",
              "Số người đăng ký",
              "Trạng thái",
            ].map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {course && (
            <tr className="hover:bg-green-50 transition-colors">
              <td className="py-4 px-4 text-sm text-gray-900">{course.id}</td>
              <td className="py-4 px-4 text-sm text-gray-700">
                {course.nameCourse}
              </td>
              <td className="py-4 px-4 text-sm text-gray-700">{course.time}</td>
              <td className="py-4 px-4 text-sm text-gray-700">
                <Badge color={course.type === "1" ? "purple" : "green"}>
                  {course.type === "1" ? "Trả phí" : "Miễn phí"}
                </Badge>
              </td>
              <td className="py-4 px-4 text-sm text-gray-700">
                {course.dateStart}
              </td>
              <td className="py-4 px-4 text-sm text-gray-700">
                {course.menberJoin}
              </td>
              <td className="py-4 px-4 text-sm text-gray-700">
                <Badge color={course.accepted ? "success" : "failure"}>
                  {course.accepted ? "Đã duyệt" : "Chưa duyệt"}
                </Badge>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DetailCourseTable;
