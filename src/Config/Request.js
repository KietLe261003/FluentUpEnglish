import axios from "axios";

// Tạo một instance axios với cấu hình mặc định
export const request = axios.create({
    baseURL: "http://localhost:8080/api/", // URL từ file cấu hình môi trường
    timeout: 0, // Không giới hạn thời gian request
    headers: { 'X-Custom-Header': 'foobar' } // Header mặc định
});

// Thêm interceptor để chèn token vào mỗi request nếu có
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config; 
    },
    (error) => {
        // Xử lý lỗi trước khi request được gửi đi
        return Promise.reject(error);
    }
);

// Thêm interceptor để xử lý lỗi trả về từ server
request.interceptors.response.use(
    (response) => {
        // Trả về response như bình thường nếu không có lỗi
        return response;
    },
    (error) => {
        // Xử lý lỗi khi server trả về, ví dụ: 401 hoặc 403
        if (error.response?.status === 401) {
            console.error("Unauthorized! Redirecting to login...");
            // Có thể redirect người dùng đến trang đăng nhập hoặc logout
        }
        return Promise.reject(error); // Trả về lỗi để xử lý thêm nếu cần
    }
);