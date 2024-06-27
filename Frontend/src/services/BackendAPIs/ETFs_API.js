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