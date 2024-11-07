"use client"
import * as React from "react"
import { useState } from "react"
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
import { ButtonLoading } from "./ButtonLoading"
import { validateYTLink } from "@/app/lib/actions/validateYTLink"
import { ModeToggle } from "./mode-toggle"

export function YoutubeForm() {
  const [url, setUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit() {
    try {
      validateYTLink(url);
      setIsSubmitted(true);

      const result = await sendToConvert(url); // just send to convert
      setUrl(""); // Clear the input field
      setIsSubmitted(false);
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
    }
  }

  return (
    <Card className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardTitle>YT Digest</CardTitle>
          <ModeToggle />
        </div>
        <CardDescription>Paste a Youtube URL to get a Digest.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="Youtube URL"
                value={url} // Bind input value to the state
                onChange={(e) => setUrl(e.currentTarget.value)} // Update state on change
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isSubmitted ? <ButtonLoading /> : <Button onClick={handleSubmit}>Process</Button>}
      </CardFooter>
    </Card>
  );
}
