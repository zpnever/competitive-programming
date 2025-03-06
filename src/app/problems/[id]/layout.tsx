// File: src/app/problems/[id]/layout.tsx
export default function ProblemLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="flex flex-col h-screen">{children}</div>;
}
