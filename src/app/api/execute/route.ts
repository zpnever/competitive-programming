// File: src/app/api/execute/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CodeExecutionRequest, CodeExecutionResponse } from "../../types";

export async function POST(request: NextRequest) {
	try {
		const { code, input } = await request.json();

		const pistonPayload: CodeExecutionRequest = {
			language: "javascript",
			version: "18.15.0",
			files: [
				{
					name: "index.js",
					content: code,
				},
			],
			stdin: input || "",
		};

		const response = await fetch("https://emkc.org/api/v2/piston/execute", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(pistonPayload),
		});

		if (!response.ok) {
			throw new Error("Failed to execute code");
		}

		const result: CodeExecutionResponse = await response.json();
		return NextResponse.json(result);
	} catch (error: any) {
		return NextResponse.json(
			{ message: error.message || "Something went wrong" },
			{ status: 500 }
		);
	}
}
