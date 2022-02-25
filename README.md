# MakerDao Status Website

## Stagin Environment

[![Netlify Status](https://api.netlify.com/api/v1/badges/8bfbae5b-146c-49fd-a851-9ceb7bf32a13/deploy-status)](https://app.netlify.com/sites/status-makerdao-stagin/deploys)

[https://status-makerdao-stagin.netlify.app](https://status-makerdao-stagin.netlify.app)

## Production Environment

[http://64.225.11.50](http://64.225.11.50)

## Registering on makerdao network

In order to make the request to some Makerdao services you may need to create your own `user` and `password`

To obtain this data you should use [`this procediment`](https://data-api.makerdao.network/redoc#operation/register_user_v1_users_register_post), consisting on send a `POST` request to the endpoint:

```sh
https://data-api.makerdao.network/v1/users/register
```

With the parameters in this structure:

```json
{
  "password": "string",
  "email": "user@example.com",
  "full_name": "string"
}
```

## Updating the local .env file

Once you have a `email/password` you should copy the file `.env.example` to a new file called `.env` and replace its `email_in_makerdao_network` and `password__in_makerdao_network` with the email and password previusly registered
