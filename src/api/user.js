import axios from 'axios';

export const getUsersApi = async () => {
  try {
    const res = await axios.get('http://localhost:3001/users');
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getUserDetailApi = async (id) => {
  try {
    const res = await axios.get('http://localhost:3001/users/' + id);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const deleteUserApi = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/users/${id}`);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postUserApi = async (payload) => {
  try {
    await axios.post(`http://localhost:3001/users`, payload);
  } catch (e) {
    console.error();
  }
};

export const putUserApi = async (editId, payload) => {
  try {
    await axios.put(`http://localhost:3001/users/${editId}`, payload);
  } catch (e) {
    console.error();
  }
};
