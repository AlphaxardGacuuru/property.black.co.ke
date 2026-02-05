import _ from "lodash"
window._ = _

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
	import("@popperjs/core").then((module) => {
		window.Popper = module.default
	})

	import("jquery").then((module) => {
		window.$ = window.jQuery = module.default
	})

	import("bootstrap")
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

// Function for checking local storage
const getLocalStorage = (state) => {
	if (typeof window !== "undefined" && localStorage.getItem(state)) {
		return JSON.parse(localStorage.getItem(state))
	} else {
		return []
	}
}

// Decrypt Sanctum Token
const decryptedToken = () => {
	import("crypto-js").then((CryptoJS) => {
		const secretKey = "BlackPropertyAuthorizationToken"

		// Decrypt
		var bytes = CryptoJS.default.AES.decrypt(
			getLocalStorage("sanctumToken"),
			secretKey
		)

		return bytes.toString(CryptoJS.default.enc.Utf8)
	})
}

import Axios from "axios"
window.Axios = Axios

// window.Axios.defaults.baseURL = import.meta.env.VITE_APP_URL

window.Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"

window.Axios.defaults.headers.common["Authorization"] =
	`Bearer ${decryptedToken()}`

Axios.defaults.withCredentials = true

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from "laravel-echo"
import Pusher from "pusher-js"

window.Pusher = Pusher

// window.Echo = new Echo({
// 	version: 2,
// 	broadcaster: "pusher",
// 	key: import.meta.env.VITE_PUSHER_APP_KEY,
// 	cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
// 	// cluster: "", // Empty for self-hosted websockets
// 	wsHost: window.location.hostname,
// 	wsPort: 6008,
// 	wssPort: 6008,
// 	// forceTLS: window.location.protocol === "https:",
// 	forceTLS: false,
// 	disableStats: true,
// 	auth: {
// 		headers: {
// 			"X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
// 			Authorization: "Bearer " + decryptedToken(),
// 		},
// 	},
// 	authorizer: (channel, options) => {
// 		return {
// 			authorize: (socketId, callback) => {
// 				window.Axios.post("/api/broadcasting/auth", {
// 					socket_id: socketId,
// 					channel_name: channel.name,
// 				})
// 					.then((res) => callback(null, res.data))
// 					.catch((error) => callback(error))
// 			},
// 		}
// 	},
// })
