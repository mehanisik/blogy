import { BookOpen, Gamepad2, Smile, TreePine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InterestsCard() {
	return (
		<Card className="relative col-span-1 row-span-1 h-full border border-dashed border-muted bg-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-base">
					<Smile className="h-4 w-4 text-primary" />
					Hobbies
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex items-center gap-2">
					<BookOpen className="h-4 w-4 text-primary" />
					<span className="text-sm">Reading</span>
				</div>
				<div className="flex items-center gap-2">
					<Gamepad2 className="h-4 w-4 text-primary" />
					<span className="text-sm">Gaming</span>
				</div>
				<div className="flex items-center gap-2">
					<TreePine className="h-4 w-4 text-primary" />
					<span className="text-sm">Nature</span>
				</div>
			</CardContent>
		</Card>
	);
}
