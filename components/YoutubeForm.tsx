"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendToConvert } from "@/app/lib/actions/sendToConvert"
import { useRef, useState } from "react"
import { ButtonLoading } from "./ButtonLoading"
import { validateYTLink } from "@/app/lib/actions/validateYTLink"
import { addNewVideo } from "@/app/lib/actions/addNewVideo"


export function YoutubeForm() {
  const [url, setUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(url : string) {
    try {
      validateYTLink(url);
      setUrl("");
      setIsSubmitted(true);
      
      const result = await sendToConvert(url); // just send to convert
      setIsSubmitted(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <CardHeader>
        <CardTitle>YT Digest</CardTitle>
        <CardDescription>Paste a Youtube URL to get a Digest.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">URL</Label>
              <Input id="url" placeholder="Youtube URL" onChangeCapture={e => setUrl(e.currentTarget.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isSubmitted ? <ButtonLoading /> : <Button onClick={() => handleSubmit(url)}>Process</Button>}
      </CardFooter>
    </Card>
  );
}
