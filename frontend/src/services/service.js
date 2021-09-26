import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
console.log("Backend URL: " + baseUrl);

const formData = (obj) => {
    let formData = new FormData();
    for (const key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}

export const Service = {
    upload: (file) => axios.post(baseUrl + "/upload", formData({ file })),
    checkFileType: (file) => axios.post(baseUrl + "/check-file-type", formData({ file })),
    checkRealType: (file) => axios.post(baseUrl + "/check-real-type", formData({ file })),
}