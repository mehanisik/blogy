import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LocationCard() {
	return (
		<Card className="relative col-span-1 row-span-1 overflow-hidden border border-dashed bg-card">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
					<MapPin className="h-4 w-4 text-primary" />
					Location
				</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-card-foreground">Warsaw, Poland</p>
			</CardContent>
		</Card>
	);
}
