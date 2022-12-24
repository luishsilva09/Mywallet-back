<p align="center"> 
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4b0.svg" height="300px">
</p>

<h1 align="center">MyWallet</h1>

<div align="center">
  <h3>Built With</h3>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="	https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" heigth="30px">
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Description

The better way to organize your finances.

# Fatures

- Signin and signup
- Add deposit
- Add expense
- Delete item
- Get statement

# API references

### Signup:

```https
    POST /signup
```

Request:

| Body             | Type     | Description                   |
| ---------------- | -------- | ----------------------------- |
| `name`           | `string` | **Reuqired**. user name       |
| `email`          | `string` | **Reuqired**. email from user |
| `password`       | `string` | **Reuqired**. password        |
| `repeatPassword` | `string` | **Reuqired**. repeat password |

### Signin:

```https
    POST /signin
```

Request:

| Body       | Type     | Description                   |
| ---------- | -------- | ----------------------------- |
| `email`    | `string` | **Reuqired**. email from user |
| `password` | `string` | **Reuqired**. password        |

Response:

```json
{
  "user": {
    "_id": "63a0bf8685c777bc86fba1c1", // user id
    "name": "luis", // user name
    "email": "luis@gmail.com", //user email
    "password": "$2b$10$s1iTuzA9EAvPYS5nmIhNAu2T/WBncuYqjxNc1WNUSfqPXjhN8LbZe", //user password
    "extrato": [
      // statement from user
      {
        "_id": "63a2354db442a843e70e844f",
        "data": "20/12",
        "valor": 55,
        "descricao": "erg",
        "type": "entrada"
      }
    ]
  },
  "token": "0a54d0aa-8590-480f-9d7b-1bce4316224f" // token for auth
}
```

### Add deposit:

```https
    POST /deposit
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

</br>

| Body        | Type        | Description                        |
| ----------- | ----------- | ---------------------------------- |
| `data`      | `timeStamp` | **Reuqired**. date from now        |
| `valor`     | `number`    | **Reuqired**. value\price          |
| `descricao` | `string`    | **Reuqired**. description          |
| `type`      | `string`    | **Reuqired**. "entrada" or "saida" |

### Add expense:

```https
    POST /expense
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

</br>

| Body        | Type        | Description                        |
| ----------- | ----------- | ---------------------------------- |
| `data`      | `timeStamp` | **Reuqired**. date from now        |
| `valor`     | `number`    | **Reuqired**. value\price          |
| `descricao` | `string`    | **Reuqired**. description          |
| `type`      | `string`    | **Reuqired**. "entrada" or "saida" |

### Get statement:

```https
    GET /statement
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

Response:

```json
{
  "userData": [
    {
      "_id": "63a2354db442a843e70e844f",
      "data": "20/12",
      "valor": 55,
      "descricao": "erg",
      "type": "entrada"
    },
    {
      "_id": "63a23551b442a843e70e8450",
      "data": "20/12",
      "valor": 554,
      "descricao": "g",
      "type": "saida"
    }
  ],
  "total": -499 // total
}
```

### Delete item:

```https
    delete /deleteStatement/${id}
```

Request:

| Headers         | Type     | Description                          |
| --------------- | -------- | ------------------------------------ |
| `Authorization` | `string` | **Reuqired**. Bearer token from user |

</br>

| Params | Type     | Description                |
| ------ | -------- | -------------------------- |
| `id`   | `string` | **Reuqired**. id from item |

# Run Locally

Clone the project:

```bash

  git clone https://github.com/luishsilva09/Mywallet-back.git

```

Install dependencies:

```bash

  npm install

```

To run dev mode:

```bash
    npm run dev
```

To run:

```bash
    npm start
```

# Environment Variables

To run this project in local, you will need to add the following environment variables to your .env file

`MONGO_URI = mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]`

`PORT = number #recommended:4000`

# Authors

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09
