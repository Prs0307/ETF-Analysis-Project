/* eslint-disable no-unused-vars */
const BASE_URL='http://127.0.0.1:8000/services/'

export const  etfList=  async ()=> {
    
    try {
        const Response=await fetch(BASE_URL+'etf/')
        const json_Response=Response.json()
        return json_Response
    } catch (error) {
        console.log(error);
        throw new Error('Server error: ')
    }
}



export const etfsDetails = async (query_params) => {
    let queryString = "?";

    for (const [key, value] of Object.entries(query_params)) {
        if (value != null && value !== "") {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        }
    }
    
    // Remove the trailing '&' if present
    queryString = queryString.endsWith("&") ? queryString.slice(0, -1) : queryString;

    try {
        const response = await fetch(BASE_URL + 'update-etfstocks/' + queryString);
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.log(error);
        throw new Error('Server error: ' + error.message);
    }
}


// const BASE_URL='http://127.0.0.1:8000/services/'

export const  etfsSectors=  async ()=> {
   
    try {
        const response = await fetch(BASE_URL + 'filters/');
        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.log(error);
        throw new Error('Server error: ' + error.message);
    }
}
