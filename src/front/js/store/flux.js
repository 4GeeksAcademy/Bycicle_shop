import axios from 'axios';
import { json } from 'react-router-dom';
import stripe from 'stripe';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: [],
			token: [],
			orders: [],
			cart: [],
			shipping_address: [
			],
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
			setShipping_addressToProfile: (profileData) => {
				setStore({ shipping_address: profileData });
			},
			setOrdersToProfile: (profileData) => {
				setStore({ orders: profileData });
			},

			logout: () => {
				axios.post('/logout')
					.then(response => {
						if (response.data.success === 'true') {
							console.log("Logout successful");
						} else {
							console.error('Logout failed:', response.data.msg);
						}
					})
				localStorage.removeItem('access_token'); // Always remove token

			},
			addToCart: (image_url, name, price, quantity, price_id) => {
				const store = getStore();
				const token = localStorage.getItem('access_token');

				if (!token) {
					console.error('Token is not available');
					return;
				}

				const payload = {
					image_url: image_url,
					name: name,
					price: price,
					quantity: quantity,
					price_id: price_id
				};

				setStore({ cart: store.cart.concat(payload) })
				/*console.log('Payload:', payload);
				console.log('Backend URL:', process.env.BACKEND_URL);
			  
				axios.post(`${process.env.BACKEND_URL}/cart`, payload, {
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				  },
				  withCredentials: true,
				})
				.then((response) => {
				  console.log(response);
				  console.log('Item added to cart:', response.data);
				  sessionStorage.setItem('cart', JSON.stringify(response.data.orders));
				  setStore({ orders: response.data.orders });
				})
				.catch((error) => {
				  console.error('Error adding items to cart:', error.response ? error.response.data : error.message);
				});*/
			},

			submitReview: (name, title, review, id, rating, setMessage, setReview, setTitle, setName, getData, token) => {
				return new Promise((resolve, reject) => {
					if (!name || !title || !review) {
						setMessage("Please fill all fields");
						return reject(new Error("Please fill all fields"));
					}

					const payload = {
						name: name,
						bicycle_id: id,
						rating: rating,
						title: title,
						review: review,

					};

					console.log('Payload:', payload);
					console.log('Token:', token);

					axios.post(`${process.env.BACKEND_URL}/review`, payload, {
						headers: { Authorization: `Bearer ${token}` },
					})
						.then((response) => {
							if (response.data.success === true) {
								setReview("");
								setTitle("");
								setName("");
								if (typeof getData === 'function') {
									getData(id);
								}
								resolve(response.data);
							} else {
								reject(new Error('Submission was not successful'));
							}
						})
						.catch((error) => {

							if (error.response && error.response.status === 422) {
								console.error('Invalid request:', error.response.data);
							} else if (error.response) {
								console.error('Error Status:', error.response.status);
							} else {
								console.error('Request Error:', error.message);
							}
							reject(error);
						});
				});
			},
			changeRating: (setRating, value) => {
				setRating(value);
			},
			// function to retrive personal data to profile
			getUserProfile: async (token) => {
				console.log("Token before API call: ", token);
				if (!token) {
					console.error("No token provided");
					return null;
				}
				try {
					const response = await axios.get(process.env.BACKEND_URL + "/profile",
						{
							headers: {
								Authorization: "Bearer " + token
							}
						});
					if (response.data) {
						console.log("Setting user profile in store:", response.data);
						setStore({ user: response.data });
					} else {
						console.log("Received empty response.data from API");
					}
					return response.data;
				} catch (error) {
					// console.error("Full error:", JSON.stringify(error, null, 2));
					console.error("An error occurred while fetching the profile:", error);
					return null;
				}
			},
			// function to retrive Shipping data to profile
			getShipping_addressToProfile: async () => {
				try {
					const response = await axios.get(process.env.BACKEND_URL + "/profile",
						{
							headers: {
								Authorization: "Bearer " + token
							}
						});
					console.log("Response data: ", response.data);
					if (response.data) {
						setStore({ shipping_address: response.data });
					} else {
						console.log("Received empty response.data from API");
					}
					return response.data;
				} catch (error) {
					// console.error("Full error:", JSON.stringify(error, null, 2));
					console.error("An error occurred while fetching the profile:", error);
					return null;
				}
			},
			// function to retrive orders data to profile
			getOrdersToProfile: async (token) => {
				console.log("Token before API call: ", token);
				if (!token) {
					return null;
				}
				try {
					const response = await axios.get(process.env.BACKEND_URL + "/profile",
						{
							headers: {
								Authorization: "Bearer " + token
							}
						});
					console.log("Response data: ", response.data);
					if (response.data) {
						setStore({ orders: response.data });
					} else {
						console.log("Received empty response.data from API");
					}
					return response.data;
				} catch (error) {
					// console.error("Full error:", JSON.stringify(error, null, 2));
					console.error("An error occurred while fetching the profile:", error);
					return null;
				}
			},
			buyNow: (id, quantity, props, navigate) => {
				const payload = {
					bicycle_id: id,
					quantity: quantity,
				};

				axios.post(`${process.env.BACKEND_URL}/cart`, payload, {
					headers: { Authorization: `Bearer ${props.token}` },
				})
					.then((response) => {
						if (response.data.success === "true") {
							// Navigate to /products
							navigate("/products");
							console.log('Item purchased successfully');
						} else {
							console.error('Unable to purchase item', response.data);
						}
					})
					.catch((error) => {
						console.error('Error purchasing item', error.response || error);
					});
			},

			getData: async (id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/products/${id}`);
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
				}
				return false;
			},
			// Function to make the checkout
			checkout: async () => {
				const token = localStorage.getItem('access_token');
				try {
				  let items = [];
				  let store = getStore();
			  
				  if (!Array.isArray(store.cart)) {
					throw new Error("store.cart is not an array");
				  }
			  
				  store.cart.forEach(c => {
					// Push each item to the 'items' array
					items.push({ price_id: c.price_id, quantity: c.quantity });
				  });
			  
				  if (items.length === 0) {
					throw new Error("No items in the cart");
				  }
				  console.log("Items:", items); // Debugging line
				  const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`
					  },
					body: JSON.stringify(items), // Convert items to JSON string
				  };
			  
				  console.log("JSON Data:", JSON.stringify(items));
			  
				  const resp = await fetch(
					`${process.env.BACKEND_URL}/create-checkout-session`,
					opts
				  );
			  
				  if (resp.ok) {
					const data = await resp.json();
					console.log(data)
					// Redirect to Stripe Checkout by replacing the current URL
					window.location.replace(data)
				  } else {
					console.error("Error:", resp.status, resp.statusText);
					// Handle the error appropriately
				  }
				} catch (error) {
				  console.error("Error message:", error.message);
				}
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
			newPass: async (token, password) => {
				try {
					const opts = {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`, // Include the token in headers if needed
						},
						body: JSON.stringify({ password: password }), // Simplify object construction
					};

					// Log the request body
					console.log(opts.body);

					// Send a PUT request to your server to update the password
					const response = await axios.options(`${process.env.BACKEND_URL}/newPassword/${token}`, opts);

					// Log the response
					console.log(response);

					if (response.status === 200) {
						document.getElementById("newMessage").textContent = "Password changed successfully";
					} else if (response.status === 404) {
						document.getElementById("newMessage").textContent = "User not found.";
					} else {
						// Provide a more descriptive error message
						document.getElementById("newMessage").textContent = "Failed to change password. Please try again.";
					}
				} catch (error) {
					console.error("Something went wrong:", error);
					// Provide a more descriptive error message
					document.getElementById("newMessage").textContent = "Failed to change password. Please try again.";
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