import fetch from "node-fetch";

// @ts-ignore
export default ({ action }, { services, exceptions, database: knex }) => {
	const { ItemsService } = services;

	// @ts-ignore
	action("users.create", async ({ collection, payload }, { schema }) => {
		const { ServiceUnavailableException } = exceptions;
		const itemService = new ItemsService("logsnag", { knex, schema, accountability: { admin: true, ip: "127.0.0.1" } });
		const settings = await itemService.readSingleton({ fields: ["*"] });
		// if (!settings.project || !settings.channel || !settings.title || !settings.description || settings.emoji) return;
		try {
			const headers = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${settings.api_token}`,
			};
			var response = await fetch("https://api.logsnag.com/v1/log", {
				method: "POST",
				headers,
				body: JSON.stringify({
					project: settings.project,
					channel: settings.channel,
					event: settings.message_title,
					description: settings.message_description,
					icon: settings.emoji,
					notify: true,
				}),
			});
			console.log(response);
		} catch (error) {
			throw new ServiceUnavailableException(error);
		}
	});
};
