![directus-logsnag](https://github.com/Intevel/directus-logsnag/blob/master/banner.png?raw=true)

# Directus LogSnag


📢  Easily get notified when something in Directus happens.

## What is LogSnag?

LogSnag is a simple event tracking tool. It helps you easily track what is happening within your projects, creates custom feeds, and notifies you of important events.
Register your application [here](https://logsnag.com/)

## Installation

> If you have any questions or problems, open an discussion on Github.

1. Firstly create a LogSnag account
2. Create your LogSnag project and your channels
3. Get your LogSnag API Token, you can find, generate or revoke your API tokens from the API page under settings.
4. Clone this repository, and copy the file from `dist` to your directus extensions folder `/extensions/hooks/directus-logsnag/`.
5. Now you can configure ✨

## Configuration
Your configuration file should be in your directus extensions folder under `/extensions/hooks/directus-logsnag/logsnag.config.json`.

```json
{
	"api_token": "-",
	"events": [
		{ "name": "users.create", "project": "test", "channel": "nuxttest", "event": "New User!", "description": "A new Directus user was created", "icon": "🤑", "notify": true },
		{ "name": "payments.create", "project": "test", "channel": "nuxttest", "event": "New Payment", "description": "We've got a new payment :)", "icon": "💸", "notify": true }
	]
}
```

This is the configuration scheme, please insert your LogSnag API Token in `api_token`. 
Now you can configure your events, `name` is the parameter for the event name in Directus. So `users.create` would be the event in Directus which is called when a new User is created, after the event name, the LogSnag Configuration follows, this is how the message which is sended to LogSnag look like.


## License

Published under MIT - Made with 💜  by Conner Luka Bachmann

