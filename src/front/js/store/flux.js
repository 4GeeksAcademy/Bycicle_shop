import { serverURL } from "../config";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: [],
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

			addToCart: (id, quantity, props, navigate) => {
				const payload = {
					bicycle_id: id,
					quantity: quantity,
				};
				axios
					.post(`${API_URL}/cart`, payload, {
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
					.post(`${serverURL}/review`, payload, {
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

			addToCart: (id, quantity, props, navigate) => {
				const payload = {
					bicycle_id: id,
					quantity: quantity,
				};
				axios
					.post(`${serverURL}/cart`, payload, {
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

			signup: async (fullName, username, email, password, subscribe, privacy) => {
				const opts = {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						full_name: fullName,
						username: username,
						email: email,
						password: password,
						subscribe: subscribe,
						privacy: privacy,
					}),
				};

				try {
					const resp = await fetch(
						"https://cautious-carnival-xpqwxwxp9p4h65xp-3001.app.github.dev/api/create-user",
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