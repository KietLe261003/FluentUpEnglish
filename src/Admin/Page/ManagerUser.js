import React from "react";
import TableUser from '../Components/TableUser.js';
import { Button } from "flowbite-react";

function ManagerUser() {
    const columns = [
        { field: "id", headerName: "ID Người Dùng", width: 200 },
        { field: "name", headerName: "Họ và Tên", width: 250 },
        { field: "email", headerName: "Email", width: 300 },
        { field: "birthDate", headerName: "Ngày Sinh", width: 120 },
        { field: "address", headerName: "Địa Chỉ", width: 200 },
        { field: "role", headerName: "Vai Trò", width: 120 },
        {
            field: "actions",
            headerName: "Thao Tác",
            width: 300,
            renderCell: (item) => (
                <div className="flex gap-2">
                    <Button color="blue" size="sm">Chi Tiết</Button>
                    <Button color="failure" size="sm">Xóa</Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 bg-green-50 min-h-screen">
            <h1 className="text-3xl font-bold text-green-800 mb-6">Quản Lý Người Dùng</h1>
            <div className="bg-white rounded-lg shadow-lg p-4">
                <TableUser columns={columns} />
            </div>
        </div>
    );
}

export default ManagerUser;