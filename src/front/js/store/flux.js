import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: [],
			token: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			onChangeName: (name, setNameFlag, setName, value) => {
				setNameFlag(false);
				setName(value);
				if (value === "") {
					setNameFlag(true);
				}
			},

			onChangeTitle: (title, setTitleFlag, setTitle, value) => {
				setTitleFlag(false);
				setTitle(value);
				if (value === "") {
					setTitleFlag(true);
				}
			},

			onChangeReview: (review, setReviewFlag, setReview, value) => {
				setReviewFlag(false);
				setReview(value);
				if (value === "") {
					setReviewFlag(true);
				}
			},

			plusQuantity: (quantity, setQuantity) => {
				setQuantity(quantity + 1);
			},

			minusQuantity: (quantity, setQuantity) => {
				if (quantity < 2) return;
				setQuantity(quantity - 1);
			},

			onChangeQuantity: (setQuantity, value) => {
				setQuantity(value);
			},

			setUserProfile: (profileData) => {
				setStore({ user: profileData });
			},

			logout: () => {
				axios.post('/api/logout')
					.then(response => {
						if (response.data.success === 'true') {
							console.log("Logout successful");
						} else {
							console.error('Logout failed:', response.data.msg);
						}
					})
					.catch(error => {
						console.error('Logout error:', error);
					})
					.finally(() => {
						localStorage.removeItem('access_token'); // Always remove token

					});
			},

			addToCart: (id, quantity, props, navigate) => {
				const payload = {
					bicycle_id: id,
					quantity: quantity,
				};
				axios
					.post(process.env.BACKEND_URL + "/cart", payload, {
						headers: { Authorization: `Bearer ${props.token}` },
					})
					.then((response) => {
						console.log(response);
						if (response.data.success === "true") {
							console.log(response.data.access_token);
							navigate("/products");
						} else {
						}
					})
					.catch((error) => {
						if (error.response) {
							console.log(error.response);
						}
					});
			},

			submitReview: (name, title, review, id, props, setMessage, setReview, setTitle, setName, getData) => {
				let flag = true;
				if (name === "") {
					flag = false;
					setNameFlag(true);
				}
				if (title === "") {
					flag = false;
					setTitleFlag(true);
				}
				if (review === "") {
					flag = false;
					setReviewFlag(true);
				}
				if (!flag) {
					setMessage("Please fill all fields");
					return;
				}
				const payload = {
					rating: rating,
					name: name,
					title: title,
					review: review,
					bicycle_id: id,
				};
				axios
					.post(process.env.BACKEND_URL + "/review", payload, {
						headers: { Authorization: `Bearer ${props.token}` },
					})
					.then((response) => {
						console.log(response);
						if (response.data.success === "true") {
							console.log(response.data.access_token);
							setReview("");
							setTitle("");
							setName("");
							getData();
						} else {
						}
					})
					.catch((error) => {
						if (error.response) {
							console.log(error.response);
						}
					});
			},

			changeRating: (setRating, value) => {
				setRating(value);
			},

			getUserProfile: async (token) => {
				console.log("Token before API call: ", token);
				if (!token) {
					console.error("No token provided");
					return null;
				}
				try {
					console.log("Attempting to fetch profile with token:", token);
					console.log("Headers being sent: ", {
						Authorization: "Bearer " + token
					});
					console.log("About to make API call");
					const response = await axios.get(process.env.BACKEND_URL + "/profile",
						{
							headers: {
								Authorization: "Bearer " + token
							}

						});
					console.log("Response data: ", response.data);
					if (response.data) {
						console.log("Setting user profile in store:", response.data);
						setStore({ user: response.data });
					} else {
						console.log("Received empty response.data from API");
					}
					return response.data;
				} catch (error) {
					console.error("Full error:", JSON.stringify(error, null, 2));
					console.error("An error occurred while fetching the profile:", error);
					return null;
				}
			},
			addToCart: (id, quantity, props, navigate) => {
				const payload = {
					bicycle_id: id,
					quantity: quantity,
				};
				axios
					.post(`${process.env.BACKEND_URL}/cart`, payload, {
						headers: { Authorization: `Bearer ${props.token}` },
					})
					.then((response) => {
						console.log(response);
						if (response.data.success === "true") {
							console.log(response.data.access_token);
							navigate("/products");
						} else {
						}
					})
					.catch((error) => {
						if (error.response) {
							console.log(error.response);
						}
					});
			},

			getData: async (id) => {
				try {
					const resp = await fetch(`/api/products/${id}`);
					const data = await resp.json();
					setStore({
						product: data.bicycle,
						reviewList: data.bicycle_reviews,
					});
				} catch (error) {
					console.log("Error loading product data from backend", error);
				}
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			signup: async (fullName, username, email, password, confirmePassword, subscribe, privacy) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						full_name: fullName,
						username: username,
						email: email,
						password: password,
						confirmePassword: confirmePassword,
						subscribe: subscribe,
						privacy: privacy,
					}),
				};
				try {
					const resp = await fetch(
						`${process.env.BACKEND_URL}/api/create-user`,
						opts
					);
					const data = await resp.json();

					if (resp.status === 201) {
						console.log("User created successfully", data);
						return true;
					} else {
						alert(`Error: ${data.message}`);
					}
				} catch (error) {
					console.error("An error occurred while signing up", error);
					console.error("Error name:", error.name);
					console.error("Error message:", error.message);
				}
				return false;
			},
			// Function to send a POST request to your server to initiate the password reset process
			resetPassword: async (token, email) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`, // Include the token in headers if needed
					},
					body: JSON.stringify({ email: email }),
				};
				console.log(email);
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/resetPassword', opts);
					const data = await resp.json();
					console.log(data);
					if (resp.status === 200) {
						document.getElementById("resetMessage").textContent = "Check your email for a password reset!";
					} else if (resp.status === 404) {
						document.getElementById("resetMessage").textContent = "User with this email does not exist.";
					} else {
						document.getElementById("resetMessage").textContent = 'Error sending email';
					}
				} catch (error) {
					// Handle network errors or other issues
					console.error("Error sending reset email:", error);
					document.getElementById("resetMessage").textContent = "Error sending reset email.";
				}
			},
			// Function to change the old password that you don't remember for a new one
			newPass: async (password, confirmPassword, token) => {
				// Check if passwords match on the client side
				if (password !== confirmPassword) {
				document.getElementById("newMessage").textContent = "Passwords do not match.";
				return; // Don't proceed with the request
				}
			
				// Check if password is empty
				if (!password) {
				document.getElementById("newMessage").textContent = "Password cannot be empty.";
				return;
				}
			
				const opts = {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ password: password, confirmPassword: confirmPassword }),
				};
			
				try {
				// Send a PUT request to your server to update the password
				const response = await axios.put(`${process.env.BACKEND_URL}/newPassword/${token}`, opts);
			
				if (response.status === 200) {
					document.getElementById("newMessage").textContent = "Password changed successfully";
				} else if (response.status === 404) {
					document.getElementById("newMessage").textContent = "User not found.";
				} else {
					document.getElementById("newMessage").textContent = "Something went wrong.";
				}
				} catch (error) {
				console.error("Something went wrong:", error);
				document.getElementById("newMessage").textContent = "Something went wrong.";
				}
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;