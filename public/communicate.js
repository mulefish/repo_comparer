// boiler plate fetch stuff. 
// 
async function sendGet(url)     {
    const response = await fetch(url);
    const data = await response.json()
    return data;
}

async function sendPost(url, opts)     {
    const response = await fetch(url,{      
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(opts)
    });
    const data = await response.json()
    return data;
}
