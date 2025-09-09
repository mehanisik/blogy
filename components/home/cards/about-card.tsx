import Image from "next/image";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { supabaseServer } from "@/utils/supabase/server";

export async function AboutCard() {
	const supabase = await supabaseServer();
	const {
		data: { publicUrl },
	} = supabase.storage.from("personal-files").getPublicUrl("profile.png");
	return (
		<Card className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-2 row-span-3 border border-muted hover:border-muted-foreground/20 overflow-hidden relative">
			<CardHeader>
				<div className="flex items-start justify-between">
					<CardTitle className="text-base font-semibold text-foreground">
						About
					</CardTitle>
					<CardAction>
						<div className="relative">
							{/* Animated Ring */}
							<div
								className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary/80 to-secondary opacity-75"
								style={{ animation: "spin 8s linear infinite" }}
							/>
							<div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-secondary/20 shadow-lg p-0.5 group-hover:scale-105 transition-transform duration-300">
								<div className="relative w-full h-full rounded-full ring-2 ring-background bg-background overflow-hidden shadow-inner">
									<Image
										src={publicUrl}
										alt="Mehmet ISIK"
										fill
										className="rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
										priority
										sizes="(max-width: 768px) 80px, 80px"
									/>
								</div>
							</div>
						</div>
					</CardAction>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Name & Title Section */}
				<div className="space-y-2">
					<h3 className="text-lg font-semibold text-foreground">Mehmet ISIK</h3>
					<p className="text-sm text-muted-foreground">Software Engineer</p>
				</div>

				{/* Bio Section */}
				<div className="space-y-4">
					<p className="text-sm leading-relaxed text-muted-foreground">
						Recent master's graduate in Computer Science with a passion for
						software development and building modern web applications.
					</p>

					<p className="text-sm leading-relaxed text-muted-foreground">
						I specialize in the React ecosystem and love exploring cutting-edge
						technologies, infrastructure, and distributed systems.
					</p>

					<p className="text-sm leading-relaxed text-muted-foreground">
						When I'm not coding, you'll find me playing chess, reading books, or
						enjoying nature's tranquility.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
