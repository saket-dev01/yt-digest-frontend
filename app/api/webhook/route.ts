import { getVideoWithNotes } from '@/app/lib/actions/getVideoWithNotes';
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { updateVideo } from "@/app/lib/actions/updateVideo";


export async function GET() {
    
    return NextResponse.json({
        message: "Hello there"
    }, {
        status: 200
    })
}


export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const { id, text } = body;

        if (!id || !text) {
            return NextResponse.json({
                message: "Missing required fields",
            }, {
                status: 400 // Bad Request
            });
        }
        // first I should save the text
        const updateResponse = await updateVideo(id, text); // update hua 
        const note = await getVideoWithNotes(id);
        console.log(note);
        return NextResponse.json({
            message: "Data received successfully",
            receivedData: { id, text }
        }, {
            status: 201 // Created
        });

    } catch (error) {
        // TODO: update failed status 

        return NextResponse.json({
            message: "Error processing request",
            error: error
        }, {
            status: 400 // Bad Request
        });
    }
}