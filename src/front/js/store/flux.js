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
		}
	};
};

export default getState;
