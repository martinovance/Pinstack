import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import favicon from '../assets/favicon.png';
import jwt_decode from "jwt-decode";

import { client } from '../client';

const Login = () => {
	const navigate = useNavigate();

	const responseGoogle = (response) => {
		console.log(response);
    createOrGetUser(response).then((decode) => {
      const { name, picture, sub } = decode;
      localStorage.setItem("user", JSON.stringify(decode));
      const doc = {
        _id: sub,
        _type: "user",
        userName: name,
        image: picture,
      };
      client.createIfNotExists(doc).then(() => {
        navigate("/", { replace: true });
      });
    });
  };

  const createOrGetUser = async (response) => {
    const decode = jwt_decode(response.credential);

    return decode;
  };


	return (
		<div className="flex justify-start items-center flex-col h-screen">
			<div className="relative w-full h-full">
				<video
					src={shareVideo}
					type="video/mp4"
					loop
					controls={false}
					muted
					autoPlay
					className="w-full h-full object-cover"
				/>
				<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
					<div className="p-2 flex flex-row items-center">
						<img src={favicon} alt="logo" className="w-10" />
						<h1 className="text-white text-3xl ml-1">Pin<span className="text-red-300">Stack</span></h1>
					</div>

					<div className="shadow-2xl">
						<GoogleLogin
							render={(renderProps) => (
								<button
									type="button"
									className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
								>
									<FcGoogle className="mr-4" /> Sign in with google
								</button>
							)}
							onSuccess={responseGoogle}
							onError={responseGoogle}
							cookiePolicy="single_host_origin"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;