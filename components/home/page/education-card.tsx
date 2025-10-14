import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EducationCard() {
	return (
		<Card className="relative col-span-1 row-span-1 h-full flex-col overflow-hidden border border-dashed bg-card">
			<CardHeader>
				<CardTitle className="text-base font-semibold text-foreground">
					Education
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex items-center gap-4">
					<Image
						src="/wut-logo.png"
						alt="Warsaw University of Technology Logo"
						width={40}
						height={40}
						className="rounded-sm"
					/>
					<div className="flex flex-col">
						<p className="text-sm font-medium">
							Warsaw University of Technology
						</p>
						<p className="text-sm text-muted-foreground">
							MSc Computer Systems & Networks
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Image
						src="/hku-logo.png"
						alt="Hasan Kalyoncu University Logo"
						width={40}
						height={40}
						className="rounded-sm"
					/>
					<div className="flex flex-col">
						<p className="text-sm font-medium">Hasan Kalyoncu University</p>
						<p className="text-sm text-muted-foreground">
							BSc Software Engineering
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
