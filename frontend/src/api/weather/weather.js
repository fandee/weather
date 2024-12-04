import { client } from "../index"

export const getWeatherData = async () => {
    try {
        const response = await client.get("/weather/")
        return response.data
    } 
    catch (error) {
        return error
    }
}