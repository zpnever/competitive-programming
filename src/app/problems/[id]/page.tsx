// File: src/app/problems/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Problem } from "../../types";
import { problems } from "../../data/problem";
import Link from "next/link";

export default function ProblemPage() {
	const params = useParams();
	const id = params.id as string;

	const [problem, setProblem] = useState<Problem | null>(null);
	const [code, setCode] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		if (id) {
			const foundProblem = problems.find((p) => p.id === id);
			if (foundProblem) {
				setProblem(foundProblem);
				// Provide a code template for the specific problem
				if (foundProblem.id === "1") {
					setCode(`/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
		let numMap = new Map(); // Menyimpan angka yang sudah ditemukan beserta indeksnya
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i]; // Hitung angka yang diperlukan untuk mencapai target
        if (numMap.has(complement)) {
            return [numMap.get(complement), i]; // Jika ditemukan, kembalikan indeksnya
        }
        numMap.set(nums[i], i); // Simpan angka beserta indeksnya ke dalam Map
    }
    return [];
}

// Example usage:
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));
`);
				} else if (foundProblem.id === "2") {
					setCode(`/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
    // Your code here
}

// Example usage:
const s = ["h","e","l","l","o"];
reverseString(s);
console.log(s);
`);
				}
			}
		}
	}, [id]);

	const runCode = async () => {
		try {
			setIsLoading(true);
			setError("");

			const response = await fetch("/api/execute", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code }),
			});

			if (!response.ok) {
				throw new Error("Failed to execute code");
			}

			const data = await response.json();

			if (data.run.stderr) {
				setError(data.run.stderr);
				setOutput("");
			} else {
				setOutput(data.run.stdout);
				setError("");
			}
		} catch (err: any) {
			setError(err.message || "Something went wrong");
			setOutput("");
		} finally {
			setIsLoading(false);
		}
	};

	if (!problem) {
		return (
			<div className="flex items-center justify-center h-screen">
				Loading...
			</div>
		);
	}

	return (
		<>
			<header className="bg-gray-800 text-white p-4">
				<div className="container mx-auto">
					<div className="flex items-center justify-between">
						<Link href="/" className="text-xl font-bold">
							LeetCode Clone
						</Link>
						<span
							className={`px-2 py-1 rounded text-xs ${
								problem.difficulty === "Easy"
									? "bg-green-500"
									: problem.difficulty === "Medium"
									? "bg-yellow-500"
									: "bg-red-500"
							}`}
						>
							{problem.difficulty}
						</span>
					</div>
				</div>
			</header>

			<main className="flex flex-1 overflow-hidden">
				{/* Problem Description Panel */}
				<div className="w-1/2 p-4 overflow-y-auto border-r">
					<h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
					<div className="whitespace-pre-line mb-6">{problem.description}</div>

					<h2 className="text-xl font-semibold mb-2">Examples:</h2>
					{problem.examples.map((example, index) => (
						<div key={index} className="mb-4 p-3 bg-gray-100 rounded">
							<div className="mb-1">
								<span className="font-semibold">Input:</span> {example.input}
							</div>
							<div className="mb-1">
								<span className="font-semibold">Output:</span> {example.output}
							</div>
							{example.explanation && (
								<div>
									<span className="font-semibold">Explanation:</span>{" "}
									{example.explanation}
								</div>
							)}
						</div>
					))}
				</div>

				{/* Code Editor and Output Panel */}
				<div className="w-1/2 flex flex-col">
					<div className="h-2/3 p-4 border-b">
						<div className="flex justify-between mb-2">
							<h2 className="text-xl font-semibold">Code</h2>
							<button
								onClick={runCode}
								disabled={isLoading}
								className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
							>
								{isLoading ? "Running..." : "Run Code"}
							</button>
						</div>
						<textarea
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="w-full h-full p-2 font-mono text-sm border resize-none"
							spellCheck="false"
						/>
					</div>

					<div className="h-1/3 p-4 bg-gray-900 text-white overflow-y-auto">
						<h2 className="text-xl font-semibold mb-2">Output</h2>
						{error && (
							<pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
						)}
						{output && <pre className="whitespace-pre-wrap">{output}</pre>}
						{!output && !error && !isLoading && (
							<div className="text-gray-400">
								Run your code to see the output here
							</div>
						)}
					</div>
				</div>
			</main>
		</>
	);
}
