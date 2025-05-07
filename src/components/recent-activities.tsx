import { ACTIVITIES } from "@/constants/activities.constant";

export function RecentActivities() {
	return (
		<section>
			<h2 className="text-xl font-medium md:text-2xl dark:text-white">
				Recently
			</h2>
			<ul className="space-y-2 text-base text-zinc-600 list-disc list-inside dark:text-white">
				{ACTIVITIES.map((activity) => (
					<li key={activity}>{activity}</li>
				))}
			</ul>
		</section>
	);
}
