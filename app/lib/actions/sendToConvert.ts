import { generateNotes } from '@/app/lib/actions/generateNotes';
'use server'
import { revalidatePath } from 'next/cache'
import axios from 'axios'
import { updateVideo } from './updateVideo'
import { addNewVideo } from './addNewVideo'
import { getVideoWithNotes } from './getVideoWithNotes';
export async function sendToConvert(url: string) {
    
    try {        
        const dataToSend = {url}
        const newVidId = await addNewVideo(url); 
        //console.log(newVidId);
        const response = await axios.post(`http://localhost:3001/download?id=${newVidId}`, dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const updateResponse = await updateVideo(newVidId, response.data.text)
        const generateNotes = await getVideoWithNotes(newVidId);
        revalidatePath('/convert')
        // yahi pe prisma se update kr skte kuki this is running on the server
        return response.data
    } catch (error) {
        console.error('Error in Converting:', error)
        throw new Error('Failed to send data to local server, please ensure you have not created duplicated requests')
    }
}