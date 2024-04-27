import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classes from './SearchBox.module.scss';

const SearchBox = () => {
	const [keyword, setKeyword] = useState('');

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate('/');
		}
	};

	return (
		<Form onSubmit={submitHandler} className={classes.form}>
			<Form.Control
				type="text"
				name="q"
				onChange={(e) => setKeyword(e.target.value)}
				placeholder="Search Product..."
				className="mr-sm-2 ml-sm-5"
			></Form.Control>
			<Button
				type="submit"
				variant="outline-success"
				className={`p-2 ${classes.searchBtn}`}
			>
				<span>Search</span>
				<i class={`fa-solid fa-magnifying-glass ${classes.searchIcon}`}></i>
			</Button>
		</Form>
	);
};

export default SearchBox;
