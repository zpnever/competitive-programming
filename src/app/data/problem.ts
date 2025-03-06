// File: src/data/problems.ts
import { Problem } from "../types";

export const problems: Problem[] = [
	{
		id: "1",
		title: "Two Sum",
		description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
		examples: [
			{
				input: "nums = [2,7,11,15], target = 9",
				output: "[0,1]",
				explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
			},
			{
				input: "nums = [3,2,4], target = 6",
				output: "[1,2]",
			},
		],
		difficulty: "Easy",
	},
	{
		id: "2",
		title: "Reverse String",
		description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
		examples: [
			{
				input: 's = ["h","e","l","l","o"]',
				output: '["o","l","l","e","h"]',
			},
			{
				input: 's = ["H","a","n","n","a","h"]',
				output: '["h","a","n","n","a","H"]',
			},
		],
		difficulty: "Easy",
	},
];
