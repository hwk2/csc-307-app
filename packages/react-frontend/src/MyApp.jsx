// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
	const [characters, setCharacters] = useState([]);

	function fetchUsers() {
		const promise = fetch("http://localhost:8000/users");
		return promise;
	}

	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
			});
		return promise;
	}

	function deleteUser(person) {
		const promise = fetch(`http://localhost:8000/users/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		});
		return promise;
	}

	// does this get the id from backend when generated????
	// NO BECAUSE IT REQUIRES REFRESH TO UPDATE FRONT END!!!!
	// FIX!!!!!!!!!
	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => {
				setCharacters(json["users_list"]);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	

	//not the most efficient method of deleting backend, however
	//i just used the person object because it was how backend
	//had already been implementing it.
	//all users are guarenteed to have an ID after the use of generateID
	/* users are properly deleted, however the bakcend console log
	doesn't properly display the id of the delted user unless the front-end
	is refreshed???? also saving front end changes causes reappearance of deleted user???? */
	function removeOneCharacter(index) {
		let person = characters[index];
		deleteUser(person)
		.then(() => {
			console.log("User deleted");
			const updated = characters.filter((character, i) => {
			return i !== index;
			});
			setCharacters(updated);
		});

	}
	
	function updateList(person) {
		postUser(person)
		.then(
			() => {
				setCharacters([...characters, person]);
				console.log();
			}
		)
		.catch((error) => {
			console.log(error);
		});
	}
	
	return (
		<div className = "container">
			<Table
				characterData = {characters} 
				removeCharacter = {removeOneCharacter}
			/>
			<Form handleSubmit={updateList} />
		</div>
	);
}

export default MyApp;