import {
	AboutCard,
	CodingStatsCard,
	EducationCard,
	HobbiesCard,
	LocationCard,
	RecentActivityCard,
} from "@/components/home/cards";

export async function HomeGrid() {
	return (
		<div className="flex h-full w-full items-center justify-center min-h-[70vh]">
			<div className="grid h-full w-full gap-2  lg:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-lg py-5">
				<RecentActivityCard />
				<EducationCard />
				<CodingStatsCard />
				<AboutCard />
				<HobbiesCard />
				<LocationCard />
			</div>
		</div>
	);
}
