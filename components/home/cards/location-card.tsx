import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LocationCard = () => {
	return (
		<Card className="w-full h-full col-span-1 sm:col-span-1 lg:col-span-1 row-span-1 border border-muted hover:border-muted-foreground/20 transition-colors">
			<CardHeader>
				<CardTitle>Location</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center gap-2">
					<MapPin className="w-3 h-3" />
					<span className="text-sm">Warsaw, Poland</span>
				</div>
			</CardContent>
		</Card>
	);
};
