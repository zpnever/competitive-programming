"use client";

import React, { useState } from "react";
import { Problem } from "../types/problem";
import { codeExecutorService } from "../lib/judge0";

interface ProblemPageProps {
	problem: Problem;
}

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
	const [language, setLanguage] = useState<string>("javascript");
	const [code, setCode] = useState<string>(problem.starterCode[language]);
	const [testResults, setTestResults] = useState<{
		[index: number]: { passed: boolean; output: string; error?: string };
	}>({});
	const [isRunning, setIsRunning] = useState(false);

	const handleRunTests = async () => {
		setIsRunning(true);
		const results: {
			[index: number]: { passed: boolean; output: string; error?: string };
		} = {};

		for (let i = 0; i < problem.testCases.length; i++) {
			const testCase = problem.testCases[i];
			try {
				const result = await codeExecutorService.executeCode(
					code,
					language as "javascript" | "python" | "java",
					testCase
				);
				results[i] = result;
			} catch (error) {
				results[i] = {
					passed: false,
					output: "Test execution failed",
					error: error instanceof Error ? error.message : "Unknown error",
				};
			}
		}

		setTestResults(results);
		setIsRunning(false);
	};

	return (
		<div className="container mx-auto p-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Problem Description */}
				<div>
					<h1 className="text-2xl font-bold mb-4">{problem.title}</h1>
					<div
						className={`
            badge p-2 rounded 
            ${
							problem.difficulty === "Easy"
								? "bg-green-100 text-green-800"
								: problem.difficulty === "Medium"
								? "bg-yellow-100 text-yellow-800"
								: "bg-red-100 text-red-800"
						}
          `}
					>
						{problem.difficulty}
					</div>
					<pre className="whitespace-pre-wrap mt-4">{problem.description}</pre>

					<div className="mt-4">
						<h3 className="font-bold">Function Signature:</h3>
						<pre>{problem.functionSignature}</pre>
					</div>
				</div>

				{/* Code Editor & Test Area */}
				<div className="text-black">
					{/* Language Selector */}
					<div className="mb-4">
						<label className="block mb-2">Select Language:</label>
						<select
							value={language}
							onChange={(e) => {
								setLanguage(e.target.value);
								setCode(problem.starterCode[e.target.value]);
							}}
							className="w-full p-2 border rounded"
						>
							{Object.keys(problem.starterCode).map((lang) => (
								<option key={lang} value={lang}>
									{lang.charAt(0).toUpperCase() + lang.slice(1)}
								</option>
							))}
						</select>
					</div>

					{/* Code Editor */}
					<textarea
						value={code}
						onChange={(e) => setCode(e.target.value)}
						className="w-full h-64 p-2 border rounded font-mono"
						placeholder="Write your solution here"
					/>

					{/* Run Tests Button */}
					<button
						onClick={handleRunTests}
						disabled={isRunning}
						className={`
              w-full p-2 mt-4 rounded 
              ${
								isRunning
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-500 text-white hover:bg-blue-600"
							}
            `}
					>
						{isRunning ? "Running Tests..." : "Run Tests"}
					</button>

					{/* Test Results */}
					<div className="mt-4">
						<h3 className="font-bold mb-2">Test Results:</h3>
						{Object.entries(testResults).map(([index, result]) => (
							<div
								key={index}
								className={`
                  p-2 mb-2 rounded 
                  ${
										result.passed
											? "bg-green-100 text-green-800"
											: "bg-red-100 text-red-800"
									}
                `}
							>
								<strong>Test Case {parseInt(index) + 1}:</strong>{" "}
								{result.passed ? "Passed" : "Failed"}
								{result.error && <div>Error: {result.error}</div>}
								<div>Output: {result.output}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemPage;
