
function trackFB(event, data){
    if(Object.keys(data).length === 0){
        window.fbq("track", event);
    }
    else{
        
        window.fbq("track", event, data);
    }
}


export default trackFB;