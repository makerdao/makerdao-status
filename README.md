# MakerDao Status Website

## Staging Environment

[http://64.225.11.50:8000](http://64.225.11.50:8000)

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

## How to change the collaterals icons/names

Open the **collateral-structure.yaml** file located inside **src/**. Edit the file by adding the Collaterals you need to customize:

```yaml
collaterals:
  - name: RENBTC-A # name of the Collateral you want to modify
    human_readable_name: RENBTC # Custom Name
    icon: ren_logo.svg # Custom Icon
  - name: XBTC
    human_readable_name: X-BTC-TOKEN
    icon: xbtc_logo.svg
```
The icons are stored in the **public/icons/** folder. You just need to type their name in the **collateral-structure.yaml** file and then save the changes.
