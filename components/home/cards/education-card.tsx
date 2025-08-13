import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EducationCard() {
	return (
		<Card className="w-full h-[220px] col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 border border-muted hover:border-muted-foreground/20 transition-colors overflow-hidden relative">
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2">Education</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex items-start gap-2 pb-2 border-b last:border-none border-muted hover:bg-muted/20 transition-colors px-1 -mx-1">
					<div className="p-1 border rounded border-muted bg-background">
						<div className="w-7 h-7 flex items-center justify-center">
							<Image
								src="/wut-logo.png"
								alt="WUT"
								width={28}
								height={28}
								className="rounded-sm"
							/>
						</div>
					</div>
					<div className="flex-1">
						<p className="text-xs font-medium">
							Warsaw University of Technology
						</p>
						<p className="text-xs text-foreground/70">
							MSc Computer Systems & Networks
						</p>
					</div>
				</div>
				<div className="flex items-start gap-2 pb-2 hover:bg-muted/20 transition-colors rounded-sm px-1 -mx-1">
					<div className="p-1 border rounded border-muted bg-background">
						<div className="w-7 h-7 flex items-center justify-center">
							<Image
								src="/hku-logo.png"
								alt="HKU"
								width={28}
								height={28}
								className="rounded-sm"
							/>
						</div>
					</div>
					<div className="flex-1">
						<p className="text-xs font-medium">Hasan Kalyoncu University</p>
						<p className="text-xs text-foreground/70">
							BSc Software Engineering
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
