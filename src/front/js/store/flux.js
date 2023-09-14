import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: null,
			user: [],
			product: [],
			orders: [], //??????????????
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
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded");
				if(token != null && token != "" && token != undefined) setStore({token: token})
			},
			//create the function that's allows to create a new user
			signup: async (fullName, username, email, password, subscribe, privacy)  => {
				const opts = {
				  method: 'POST',
				  headers: {
					"Content-Type": "application/json"
				  },
				  body: JSON.stringify({
					"Full Name": fullName,
					"Username": username,
					"Email": email,
					"Password": password,
					"Subscibe": subscribe,
					"Privacy": privacy
				  })
				};
			  
				try {
				  const resp = await fetch('https://ubiquitous-space-rotary-phone-7jxpv6jj4j4hrvjw-3001.app.github.dev/api/create-user', opts);
			  
				  if (resp.status === 201) {
					const data = await resp.json();
					console.log("User created successfully", data);
					// Store the authentication token or user ID in a more secure way
					// Update the UI with the logged-in user
					return true;
				  } else if (resp.status === 400) {
					const errorData = await resp.json();
					alert(`Error: ${errorData.message}`);
				  } else {
					alert("An unexpected error occurred");
				  }
				} catch (error) {
				  console.error("An error occurred while signing up", error);
				  alert("An error occurred while signing up");
				}
				return false;
			  },
			  //function that allows user to logout
			  logout: () => {
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({token: null})
			},
			//function to add products to the cart	
			addProduct: (newProduct) => {
				const store = getStore();
				const product = store.products.concat(newProduct);
				setStore({ products: product });
			},
			//function to remove products to the cart	
			removeProduct: (index) => {
				const store = getStore();
				const product = store.products.filter((c, i) => {
					return index !== i
				});
				setStore({ products: product });
			},
		}
	};
};

export default getState;
