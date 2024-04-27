import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Rating = ({ value, text, color }) => {
	console.log(value);

	return (
		<div className="rating">
			<Row xs={'auto'} style={{ justifyContent: 'space-between' }}>
				<Col>
					<span>
						<i
							style={{ color }}
							className={
								value >= 1
									? 'fas fa-star'
									: value >= 0.5
									? 'fas fa-star-half-alt'
									: 'fa-regular fa-star'
							}
						></i>
					</span>
					<span>
						<i
							style={{ color }}
							className={
								value >= 2
									? 'fas fa-star'
									: value >= 1.5
									? 'fas fa-star-half-alt'
									: 'fa-regular fa-star'
							}
						></i>
					</span>
					<span>
						<i
							style={{ color }}
							className={
								value >= 3
									? 'fas fa-star'
									: value >= 2.5
									? 'fas fa-star-half-alt'
									: 'fa-regular fa-star'
							}
						></i>
					</span>
					<span>
						<i
							style={{ color }}
							className={
								value >= 4
									? 'fas fa-star'
									: value >= 3.5
									? 'fas fa-star-half-alt'
									: 'fa-regular fa-star'
							}
						></i>
					</span>
					<span>
						<i
							style={{ color }}
							className={
								value >= 5
									? 'fas fa-star'
									: value >= 4.5
									? 'fas fa-star-half-alt'
									: 'fa-regular fa-star'
							}
						></i>
					</span>
				</Col>
				<Col>
					<span> {text && text}</span>
				</Col>
			</Row>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825'
};

export default Rating;
