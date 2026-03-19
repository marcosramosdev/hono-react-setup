import { hc, type InferResponseType } from "hono/client";
import { useEffect, useState } from "react";
import type { AppType } from "../../server/app";

const client = hc<AppType>("/");

// type Book = {
// 	title: string;
// 	numberOfPages: number;
// };

function App() {
	const [books, setBooks] = useState<InferResponseType<typeof client.api.books.$get>>([]);
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		async function fetchBooks() {
			// const res = await fetch("http://localhost:3000/api/books");
			// const data = await res.json();

			const res = await client.api.books.$get();
			const data = await res.json();
			setBooks(data);
		}

		fetchBooks();
	}, []);

	return (
		<div>
			<h2>List of Books</h2>
			{books.map((book) => (
				<p key={book.title}>
					{book.title} - {book.numberOfPages} pages
				</p>
			))}

			<h2>Counter</h2>
			<div>
				<button type="button" onClick={() => setCounter((prev) => prev + 1)}>
					add to counter
				</button>
				<p>Counter value: {counter}</p>
			</div>
		</div>
	);
}

export default App;
