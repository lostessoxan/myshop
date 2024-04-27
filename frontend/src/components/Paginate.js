import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const getUrl = (isAdmin, keyword, page) => {
	return isAdmin
		? `/admin/productslist/page/${page}`
		: keyword
		? `/search/${keyword}/page/${page}`
		: `/page/${page}`;
};

const Paginate = ({ pages, page, isAdmin, keyword = '' }) => {
	return (
		pages > 1 && (
			<Pagination>
				<LinkContainer to={getUrl(isAdmin, keyword, 1)}>
					<Pagination.First disabled={page === 1} />
				</LinkContainer>
				<LinkContainer to={getUrl(isAdmin, keyword, page - 1)}>
					<Pagination.Prev disabled={page === 1} />
				</LinkContainer>
				{[...Array(pages).keys()].map((x) => (
					<LinkContainer key={x + 1} to={getUrl(isAdmin, keyword, x + 1)}>
						<Pagination.Item active={x + 1 === page}>
							{x + 1}
						</Pagination.Item>
					</LinkContainer>
				))}
				<LinkContainer to={getUrl(isAdmin, keyword, page + 1)}>
					<Pagination.Next disabled={page === pages} />
				</LinkContainer>
				<LinkContainer to={getUrl(isAdmin, keyword, pages)}>
					<Pagination.Last disabled={page === pages} />
				</LinkContainer>
			</Pagination>
		)
	);
};

export default Paginate;
