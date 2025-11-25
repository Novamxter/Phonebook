import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const userRegister = (data) => API.post("/register", data);
export const userLogin = async (data) => {
  try{
    const res = await API.post("/login", data);
    return res
  }catch(err){
    if(err.response && err.response.status === 400){
      return console.log(err.response.error)
    }
    console.error(err)
  }
}
export const fetchContacts = async (token) => {
  try {
    const res = await API.get(`/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.noContact) {
      return { data: [] };
    }
    return res;
  } catch (err) {
    if (err.response && err.response.status === 404){
      return console.log(err.response)
    }
    console.error({ error: err });
  }
};

export const addContact = async (data) => {
  return await API.post("/contacts", data);
};
export const deleteContact = (id) => API.delete(`/contacts/${id}`);
