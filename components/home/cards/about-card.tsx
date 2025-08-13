import Image from "next/image";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function AboutCard() {
	return (
		<Card className="w-full h-full col-span-1 sm:col-span-2 lg:col-span-2 row-span-3 border border-muted hover:border-muted-foreground/20 transition-colors overflow-hidden relative">
			<CardHeader>
				<CardTitle>About</CardTitle>
				<CardAction>
					<div className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-primary/60 via-primary to-primary/60 shadow-sm">
						<div className="rounded-full ring-1 ring-background bg-background">
							<Image
								src="/profile.jpeg"
								alt="Mehmet ISIK"
								width={100}
								height={100}
								className="rounded-full object-cover w-20 h-20 "
								priority
							/>
						</div>
					</div>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div>
					<p className="text-sm font-medium">Mehmet ISIK</p>
					<p className="text-xs text-foreground/70">Software Engineer</p>
				</div>
				<p className="text-xs leading-relaxed text-foreground/70">
					I'm a recent master's graduate in Computer Science , I am interested
					in software development and building web applications, infrastructure
					and distributed systems. I love working within the React ecosystem and
					exploring new technologies, libraries, and tools. I'm always eager to
					learn and take on new challenges that push me to grow as a developer.
					When I'm not coding, you'll find me playing chess, reading books, or
					sitting in random place and enjoying the nature.
				</p>
			</CardContent>
		</Card>
	);
}
