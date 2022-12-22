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

### Signin:

```https
    POST /signin
```

### Add deposit:

```https
    POST /deposit
```

### Add expense:

```https
    POST /expense
```

### Get statement:

```https
    GET /statement
```

### Delete item:

```https
    delete /deleteStatement/${id}
```

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
