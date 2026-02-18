export function render ({
	name,
	title,
	introduction,
	links
})
{
	return `# ${name} - ${title}

> ${ introduction.trim() }

## Links

- [GitHub](${links.github})
- [LinkedIn](${links.linkedin})
- [CV](${links.cv.llm})`;
}
