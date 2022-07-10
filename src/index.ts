// @ts-nocheck
import fetch from "node-fetch";
const { api_token, events } = require("./logsnag.config.json");

export default ({ action }, { logger, services, exceptions, database: knex }) => {
	events.forEach(async (event) => {
		logger.info("[LOGSNAG] Registering event: " + event.name);
		action(event.name, async ({ collection, payload }, { schema }) => {
		    logger.info(`[LOGSNAG] ${event.name} was called.`);
			const { ServiceUnavailableException } = exceptions;
			try {
				const headers = {
					"Content-Type": "application/json",
					Authorization: `Bearer ${api_token}`,
				};
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
				logger.error(error)
				throw new ServiceUnavailableException(error);
			}
		});
	});
};
