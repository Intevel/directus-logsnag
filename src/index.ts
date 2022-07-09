import fetch from "node-fetch";
const { api_token, events } = require("./logsnag.config.json");

// @ts-ignore
export default ({ action }, { services, exceptions, database: knex }) => {
	// @ts-ignore
	events.forEach(async (event) => {
		console.log("[LOGSNAG] Registering event: " + event.name);
		// @ts-ignore
		action(event.name, async ({ collection, payload }, { schema }) => {
			const { ServiceUnavailableException } = exceptions;
			try {
				const headers = {
					"Content-Type": "application/json",
					Authorization: `Bearer ${api_token}`,
				};
				console.log("EVENT: " + event);
				return await fetch("https://api.logsnag.com/v1/log", {
					method: "POST",
					headers,
					body: JSON.stringify({
						project: event.project,
						channel: event.channel,
						event: event.event,
						description: event.description,
						icon: event.icon,
						notify: true,
					}),
				});
			} catch (error) {
				console.log(error);
				throw new ServiceUnavailableException(error);
			}
		});
	});
};
