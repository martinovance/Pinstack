import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full">
			<Circles 
				type="circles"
				color="#00BFFF"
				height={50}
				width={200}
				className="m-5"
			/>
		</div>
	)
}

export default Spinner;