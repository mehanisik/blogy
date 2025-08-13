"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function WakaTimeError({ message }: { message: string }) {
	return (
		<Alert className="max-w-4xl mx-auto mt-8">
			<AlertCircle className="h-4 w-4" />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{message}</AlertDescription>
			<div className="flex gap-2 mt-2">
				<Button variant="outline" asChild>
					<Link href="/" className="flex items-center gap-2">
						<ArrowLeft className="h-4 w-4" />
						Go back
					</Link>
				</Button>
			</div>
		</Alert>
	);
}
