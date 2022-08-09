var url_head = "http://localhost:4000/api/v2/";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };


async function createProduct(file){
    var url = url_head+'product/new';
    try{
        const formData = new FormData();
        formData.append('image', file)
        var data = {
            name : "Manga",
            description : "dummy description",
            price : 1000,
            stock : 10,
            category : "gifts",
            images : formData
        }
        var response = await axios.post(url, JSON.stringify(data), config);
        var body = await response.data;
        console.log(body);
    }
    catch(e){
        console.log(e)
    }
}

async function updateProduct(file){
    var url = url_head+'product/62eb69de4a5a679fbd9786ac';
    try{
        const formData = new FormData();
        formData.append('image', file)
        var data = {
            images : formData
        }
        var response = await axios.post(url, JSON.stringify(data), config);
        var body = await response.data;
        console.log(body);
    }
    catch(e){
        console.log(e)
    }
}




async function updateProductDet(updates, pid){
    var url = url_head+'product/'+pid;

}

export {createProduct, updateProduct, updateProductDet};