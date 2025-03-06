// File: src/types/index.ts
export interface Problem {
	id: string;
	title: string;
	description: string;
	examples: {
		input: string;
		output: string;
		explanation?: string;
	}[];
	difficulty: "Easy" | "Medium" | "Hard";
}

export interface CodeExecutionRequest {
	language: string;
	version: string;
	files: {
		name: string;
		content: string;
	}[];
	stdin: string;
}

export interface CodeExecutionResponse {
	run: {
		stdout: string;
		stderr: string;
		output: string;
		code: number;
		signal: string | null;
	};
}
