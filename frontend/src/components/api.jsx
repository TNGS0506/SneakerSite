import axios from "axios";

const fetchData = async (param) => {
  try {
    const res = await axios.get(`http://127.0.0.1:8000/${param}/`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default fetchData;
