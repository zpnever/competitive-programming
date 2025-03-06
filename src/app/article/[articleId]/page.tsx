import React from "react";

interface IArticles {
	id: number;
	title: string;
	body: string;
	tags: string[];
}

const Article = async ({
	params,
}: {
	params: Promise<{ articleId: string }>;
}) => {
	const articleId = (await params).articleId;
	const articles: IArticles[] = await fetch("https://dummyjson.com/posts")
		.then((res) => res.json())
		.then((res) => res.posts);
	const article: IArticles = articles[+articleId - 1];
	return (
		<div>
			<h2>Judul : {article.title}</h2>
			<p>Body : {article.body}</p>
			<ul>
				{article.tags.map((tag, index) => (
					<li key={index}>{tag}</li>
				))}
			</ul>
		</div>
	);
};

export default Article;
