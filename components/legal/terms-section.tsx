export default function TermsSection() {
	return (
		<main className="w-full py-5 px-5 md:px-0">
			<div className="space-y-8">
				<div className="space-y-4">
					<h1 className="text-3xl font-light tracking-tight">
						Terms of Service
					</h1>
					<p className="text-muted-foreground">
						Last updated: {new Date().toLocaleDateString()}
					</p>
				</div>

				<div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
					<section className="space-y-4">
						<h2 className="text-xl font-medium">1. Acceptance of Terms</h2>
						<p className="text-muted-foreground leading-relaxed">
							By accessing and using this website, you agree to comply with and
							be bound by these Terms of Service and all applicable laws and
							regulations. If you do not agree with any of these terms, you are
							prohibited from using or accessing this site.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">2. Use License</h2>
						<p className="text-muted-foreground leading-relaxed">
							Permission is granted to temporarily download one copy of the
							materials (information or software) on Mehmet ISIK&apos;s website
							for personal, non-commercial, and transitory viewing only. This is
							a license, not a transfer of ownership.
						</p>
						<p className="text-muted-foreground leading-relaxed">
							Under this license, you may not:
						</p>
						<ul className="list-disc list-inside space-y-2 text-muted-foreground">
							<li>Modify or copy the materials</li>
							<li>
								Use the materials for any commercial purpose or public display
							</li>
							<li>
								Attempt to decompile or reverse engineer any software on the
								website
							</li>
							<li>
								Remove any copyright or proprietary notices from the materials
							</li>
							<li>
								Transfer the materials to another person or mirror them on any
								other server
							</li>
						</ul>
						<p className="text-muted-foreground leading-relaxed">
							This license will automatically terminate if you violate any of
							these restrictions and may be terminated by the website owner at
							any time.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">3. Disclaimer</h2>
						<p className="text-muted-foreground leading-relaxed">
							The materials on this website are provided “as is.” Mehmet ISIK
							makes no warranties, expressed or implied, and disclaims all other
							warranties including, without limitation, implied warranties of
							merchantability, fitness for a particular purpose, or
							non-infringement of intellectual property or other rights.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">4. Limitations of Liability</h2>
						<p className="text-muted-foreground leading-relaxed">
							In no event shall Mehmet ISIK or its suppliers be liable for any
							damages (including, without limitation, damages for loss of data
							or profit, or due to business interruption) arising from the use
							or inability to use the materials on the website, even if Mehmet
							ISIK has been notified of the possibility of such damages.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">5. Revisions and Accuracy</h2>
						<p className="text-muted-foreground leading-relaxed">
							The materials on this website may include technical,
							typographical, or photographic errors. Mehmet ISIK does not
							warrant that any of the materials are accurate, complete, or
							current and may change them at any time without notice.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">6. Links to Other Sites</h2>
						<p className="text-muted-foreground leading-relaxed">
							This website may contain links to third-party websites. Mehmet
							ISIK is not responsible for the contents of any linked site. The
							inclusion of any link does not imply endorsement, and use of such
							linked websites is at the user’s own risk.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">7. Changes to Terms</h2>
						<p className="text-muted-foreground leading-relaxed">
							Mehmet ISIK may revise these Terms of Service at any time without
							notice. By continuing to use this website, you agree to be bound
							by the then-current version of these Terms.
						</p>
					</section>

					<section className="space-y-4">
						<h2 className="text-xl font-medium">8. Contact Information</h2>
						<p className="text-muted-foreground leading-relaxed">
							If you have any questions about these Terms of Service, please
							contact us at{" "}
							<a
								href="mailto:mehanisik@outlook.com"
								className="text-primary hover:underline"
							>
								mehanisik@outlook.com
							</a>
							.
						</p>
					</section>
				</div>
			</div>
		</main>
	);
}
