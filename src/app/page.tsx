// File: src/app/page.tsx
"use client";

import { useState } from "react";
import { problems } from "../app/data/problem";
import Link from "next/link";

export default function Home() {
	const [filter, setFilter] = useState<string>("");

	const filteredProblems = problems.filter(
		(problem) =>
			problem.title.toLowerCase().includes(filter.toLowerCase()) ||
			problem.id.includes(filter)
	);

	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-gray-800 text-white p-4">
				<div className="container mx-auto">
					<h1 className="text-2xl font-bold">LeetCode Clone</h1>
				</div>
			</header>

			<main className="flex-grow container mx-auto p-4">
				<div className="mb-6">
					<input
						type="text"
						placeholder="Search problems..."
						className="w-full p-2 border rounded"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</div>

				<div className="overflow-x-auto">
					<table className="min-w-full bg-white border">
						<thead>
							<tr className="bg-gray-100">
								<th className="py-3 px-4 text-left border-b w-16">#</th>
								<th className="py-3 px-4 text-left border-b">Title</th>
								<th className="py-3 px-4 text-left border-b w-32">
									Difficulty
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredProblems.map((problem) => (
								<tr key={problem.id} className="hover:bg-gray-50">
									<td className="py-3 px-4 border-b">{problem.id}</td>
									<td className="py-3 px-4 border-b">
										<Link
											href={`/problems/${problem.id}`}
											className="text-blue-600 hover:underline"
										>
											{problem.title}
										</Link>
									</td>
									<td className="py-3 px-4 border-b">
										<span
											className={`px-2 py-1 rounded text-xs ${
												problem.difficulty === "Easy"
													? "bg-green-500 text-white"
													: problem.difficulty === "Medium"
													? "bg-yellow-500 text-white"
													: "bg-red-500 text-white"
											}`}
										>
											{problem.difficulty}
										</span>
									</td>
								</tr>
							))}

							{filteredProblems.length === 0 && (
								<tr>
									<td colSpan={3} className="py-8 text-center text-gray-500">
										No problems found matching your search.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</main>

			<footer className="bg-gray-100 p-4 text-center text-gray-600">
				<div className="container mx-auto">
					&copy; {new Date().getFullYear()} LeetCode Clone
				</div>
			</footer>
		</div>
	);
}
