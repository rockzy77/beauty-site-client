
import url_head from "./serverApi";

const axios = require("axios");

axios.defaults.withCredentials = true;

const config = { headers: { "Content-Type": "application/json" } };



async function sendContactMail(subject, message){
    var url = url_head + "sendContactUsQuery ";
    try{
        var data = {
            subject: subject,
            message: message,
        };
        var response = await axios.post(url, JSON.stringify(data), config);
        const body = await response.data;
        return body;
    }
    catch(e){
        console.log(e);
        var error = await e.response.data.message;
        return { success: false, message: error };
    }
}

async function sendMail(subject, message){
    var url = url_head + "sendEmail ";
    try{
        var data = {
            subject: subject,
            message: message,
        };
        var response = await axios.post(url, JSON.stringify(data), config);
        const body = await response.data;
        return body;
    }
    catch(e){
        console.log(e);
        var error = await e.response.data.message;
        return { success: false, message: error };
    }
}

export {sendContactMail, sendMail}