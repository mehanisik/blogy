import { BookOpen, Gamepad2, TreePine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const HobbiesCard = () => {
	return (
		<Card className="w-full h-full col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 border border-muted hover:border-muted-foreground/20 transition-colors">
			<CardHeader>
				<CardTitle>Hobbies</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<BookOpen className="w-3 h-3" />
					<span className="text-sm">Reading</span>
				</div>
				<div className="flex items-center gap-2">
					<Gamepad2 className="w-3 h-3" />
					<span className="text-sm">Gaming</span>
				</div>
				<div className="flex items-center gap-2">
					<TreePine className="w-3 h-3" />
					<span className="text-sm">Nature</span>
				</div>
			</CardContent>
		</Card>
	);
};
