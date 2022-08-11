var url_head = "http://localhost:4000/api/v2/";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };


async function createProduct(map){
    var url = url_head+'product/new';
    const formData = new FormData();
    Object.entries(map).map(item=>{
        formData.append(item[0], item[1]);
    });
    try{
        var response = await axios.post(url, formData,config);
        var body = await response.data;
        console.log(body);
        return body['success'];
    }
    catch(e){
        console.log(e);
        return false;
    }
}



async function deleteProduct(pid){
    var url = url_head+'product/'+pid;
    try{
        var response = await axios.delete(url, config);
        var body = await response.data;
        console.log(body);
        return body['success'];
    }
    catch(e){
        console.log(e);
        return false;
    }
}




async function updateProduct(updates, pid){
    var url = url_head+'product/'+pid;
    const formData = new FormData();
    Object.entries(updates).map(item=>{
        formData.append(item[0], item[1]);
    });
    try{
        var response = await axios.put(url, formData,config);
        var body = await response.data;
        console.log(body);
        return body['success'];
    }
    catch(e){
        console.log(e);
        return false;
    }
}

export {createProduct, updateProduct, deleteProduct};