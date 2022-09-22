import url_head from "./serverApi";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };

async function getBlogs(page) {
  try {
    var url = url_head + "blogs?page=" + page;

    var response = await axios.get(url, config);

    var data = await response.data;
    return data;
  } catch (e) {
    var error = await e.response.data;
    return { success: false, message: error };
  }
}



export { getBlogs };
