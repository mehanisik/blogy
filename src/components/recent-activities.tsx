import { ACTIVITIES } from "@/constants/activities.constant";

export function RecentActivities() {
	return (
		<section className="mt-10">
			<h2 className="text-2xl font-medium md:text-3xl mb-2 dark:text-white">
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
