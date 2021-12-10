import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"


const nodeUrl = 'https://desolate-escarpment-83964.herokuapp.com/'

export const reportProblem = async (data) => {

    const token = await fetchToken()
    try{
        const resp=await axios.post(nodeUrl+"complaint/addComplaint",data,{ headers: {token : `Bearer ${token.accessToken}`}})
        // console.log(resp)
        return resp.data
        
    }catch(error){
        return {success:false,error}
    }
    

}


const fetchToken = async () => {
    const jsonValue = await AsyncStorage.getItem('data')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}