import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { client } from '../client';
// import logo from '../assets/logo.png';
import favicon from '../assets/favicon.png'

import { userQuery } from '../utils/data';
import { fetchUser } from "../utils/fetchUser"

const Home = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const[user, setUser] = useState();
	const scrollRef = useRef(null);

	const userInfo = fetchUser();

	useEffect(() => {
		const query = userQuery(userInfo?.sub);

		client.fetch(query)
			.then((data) => {
				setUser(data[0]);
			})
	}, []);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0)
	}, [])

	return(
		<div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-7s ease-out">
			<div className="hidden md:flex h-screen flex-initial">
				<Sidebar user={user && user} />
			</div>
			<div className="flex md:hidden flex-row">
				<div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
					<HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
					<Link to="/" className="flex flex-row items-center">
						<img src={favicon} alt="logo" className="w-6 h-6" />
						<h1 className="text-red-200 text-2xl ml-1">PinStack</h1>
					</Link>
					<Link to={`user-profile/${user?._id}`}>
						<img src={user?.image} alt="logo" className="w-10" />
					</Link>
				</div>
				{toggleSidebar && (
					<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
						<div className="absolute w-full flex justify-end items-center p-2">
							<AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
						</div>
						<Sidebar user={user && user} closeToggle={setToggleSidebar} />
					</div>
				)}
			</div>

			<div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
				<Routes>
					<Route path="/user-profile/:userId" element={<UserProfile />} />
					<Route path="/*" element={<Pins user={user && user} />} />
				</Routes>
			</div>
		</div>
	)
}

export default Home;