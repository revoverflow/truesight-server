![Truesight](public/img/truesight_white.png)

# Truesight Server
Search tool for OSINT and many other purposes. Truesight provides an API to search different souces through modules and replies results as a JSON object.

# Official Modules

- Twitter
    - "users" - Search users by keyword
    - "tweets" - Search tweets by keyword

# API

### Create a task

Request :

`POST /api/task`

```json
{
	"modules": [
		{
			"name": "twitter",
			"type": "users",
			"parameters": {
				"username": "revoverfl0w"
			}
		},
		{
			"name": "twitter",
			"type": "tweets",
			"parameters": {
				"keyword": "covid"
			}
		}
	]
}
```

Result:

`200 OK`

```json
{
	"success": true,
	"message": "Task created !",
	"data": {
		"id": "0963b924-b7a6-4c22-aa6e-ec77a988484a"
	}
}
```

### Get task state/results

Request :

`GET /api/task?id=0963b924-b7a6-4c22-aa6e-ec77a988484a`

```json
{
	"modules": [
		{
			"name": "twitter",
			"type": "users",
			"parameters": {
				"username": "revoverfl0w"
			}
		},
		{
			"name": "twitter",
			"type": "tweets",
			"parameters": {
				"keyword": "covid"
			}
		}
	]
}
```

Result:

`200 OK`

```json
{
	"success": true,
	"message": "Task found !",
	"data": {
		"id": "0963b924-b7a6-4c22-aa6e-ec77a988484a",
		"modules": [
			{
				"name": "twitter",
				"type": "users",
				"parameters": {
					"username": "revoverfl0w"
				}
			},
			{
				"name": "twitter",
				"type": "tweets",
				"parameters": {
					"keyword": "covid"
				}
			}
		],
		"results": [
			{
				"name": "twitter",
				"type": "users",
				"parameters": {
					"username": "revoverfl0w"
				},
				"results": [
					{
						"name": "Thomas",
						"username": "@revoverfl0w",
						"bio": "Douilleur professionnel certifié",
						"verified": false,
						"link": "https://twitter.com/revoverfl0w",
						"profilepic": "..."
					}
				]
			},
			{
				"name": "twitter",
				"type": "tweets",
				"parameters": {
					"keyword": "covid"
				},
				"results": [
                    ...
				]
			}
		],
		"status": "done"
	}
}
```