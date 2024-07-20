import { Card, CardTitle } from "@/components/ui/card"
import { Status } from "@prisma/client"
import Link from "next/link"

export default function VideoCard({ id, title, imgUrl, status }: { id: string, title: string, imgUrl: string, status: Status }) {
    const cardContent = (
        <div className="flex items-center space-x-4">
            <img
                src={imgUrl}
                alt="Thumbnail"
                width={100}
                height={100}
                className="rounded-md"
            />
            <div className="flex-1">
                <CardTitle className="text-base font-medium mb-2">{title}</CardTitle>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {status === Status.COMPLETED ? (
                            <>
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm text-muted-foreground">Completed</span>
                            </>
                        ) : (
                            <>
                                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                <span className="text-sm text-muted-foreground">Processing</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Card className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto my-4 p-4 border-none">
            {status === Status.COMPLETED ? (
                <Link href={`/video/${id}`}>
                    {cardContent}
                </Link>
            ) : (
                cardContent
            )}
        </Card>
    )
}