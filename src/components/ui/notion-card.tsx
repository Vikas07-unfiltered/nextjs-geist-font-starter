import * as React from "react";
import { cn } from "@/lib/utils";

interface NotionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function NotionCard({ className, children, ...props }: NotionCardProps) {
    return (
        <div
            className={cn(
                "rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function NotionCardHeader({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex flex-col space-y-1.5 p-6", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function NotionCardTitle({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn("font-semibold leading-none tracking-tight", className)}
            {...props}
        >
            {children}
        </h3>
    );
}

export function NotionCardDescription({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-sm text-gray-600", className)}
            {...props}
        >
            {children}
        </p>
    );
}

export function NotionCardContent({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pt-0", className)} {...props}>
            {children}
        </div>
    );
}

export function NotionCardFooter({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("flex items-center p-6 pt-0", className)}
            {...props}
        >
            {children}
        </div>
    );
}
