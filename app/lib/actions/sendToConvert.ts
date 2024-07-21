
'use server'
import { revalidatePath } from 'next/cache'
import axios from 'axios'
import { addNewVideo } from './addNewVideo'
export async function sendToConvert(url: string) {
    
    try {        
        const dataToSend = {url}
        const newVidId = await addNewVideo(url); 
        //console.log(newVidId);
        const response = await axios.post(`${process.env.BACKEND_URL}/download?id=${newVidId}`, dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        revalidatePath('/convert')
        
        return response.data
    } catch (error) {
        console.error('Error in Converting:', error)
        throw new Error('Failed to send data to local server, please ensure you have not created duplicated requests')
    }
}