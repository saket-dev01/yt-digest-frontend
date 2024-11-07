'use server'
import { revalidatePath } from 'next/cache'
import axios from 'axios'
import { addNewVideo } from './addNewVideo'

export async function sendToConvert(url: string) {
    try {        
        const newVidId = await addNewVideo(url);
        if (!newVidId) {
            throw new Error('Failed to add new video');
        }

        const dataToSend = { url }
        const response = await axios.post(`${process.env.BACKEND_URL}/download?id=${newVidId}`, dataToSend, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        revalidatePath('/convert')
        return response.data
    } catch (error) {
        console.error('Error in Converting:', error)
        if (error instanceof Error) {
            throw new Error(`Failed to send data to local server: ${error.message}`);
        } else {
            throw new Error('Failed to send data to local server: Unknown error');
        }
    }
}