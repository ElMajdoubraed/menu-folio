import axios from "axios";

const url = "/api/user";
const uploadUrl = "/api/utils/upload";

export const updateProfile = async (params: object) => {
  await axios.post(`${url}/profile`, params);
};

export const updatePassword = async (params: any) => {
  await axios.post(`${url}/password`, params);
};

export const updateAvatar = async (formdata: FormData) => {
  await axios({
    method: "post",
    url: uploadUrl,
    data: formdata,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
