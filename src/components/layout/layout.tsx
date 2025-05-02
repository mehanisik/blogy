import Header from "./header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="max-w-3xl mx-auto w-full min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 w-full">{children}</main>
		</div>
	);
}
