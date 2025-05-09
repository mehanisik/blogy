import { ACTIVITIES } from "@/constants/activities.constant";

export function RecentActivities() {
	return (
		<section>
			<h2 className="text-xl font-medium md:text-2xl text-black dark:text-white">
				Recently
			</h2>
			<ul className="space-y-2 text-base  list-disc list-inside ">
				{ACTIVITIES.map((activity) => (
					<li key={activity}>{activity}</li>
				))}
			</ul>
		</section>
	);
}
