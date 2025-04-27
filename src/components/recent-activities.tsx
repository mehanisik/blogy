import { ACTIVITIES } from "@/constants/activities.constant";

export function RecentActivities() {
	return (
		<section>
			<h2 className="text-2xl font-serif font-semibold mb-4">Recently</h2>
			<ul className="space-y-2 text-base text-gray-700">
				{ACTIVITIES.map((activity) => (
					<li key={activity} className="flex items-start">
						<span className="text-gray-500 mr-3">—</span>
						<span>{activity}</span>
					</li>
				))}
			</ul>
		</section>
	);
}
