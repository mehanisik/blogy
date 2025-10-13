"use client";

import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils/helpers";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{ className, checked = false, onCheckedChange, onChange, ...props },
		ref,
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			onCheckedChange?.(e.target.checked);
			onChange?.(e);
		};

		return (
			<div className="relative">
				<input
					ref={ref}
					type="checkbox"
					checked={checked}
					onChange={handleChange}
					className="peer sr-only"
					{...props}
				/>
				<div
					className={cn(
						"h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
						checked
							? "bg-primary text-primary-foreground"
							: "bg-background hover:bg-accent",
						className,
					)}
				>
					{checked && <Check className="h-4 w-4 text-current" />}
				</div>
			</div>
		);
	},
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
