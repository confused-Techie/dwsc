# DWSC API

## x-parse

When the `x-parse` function is called it will be provided the following parameters:
  * `value`: This is the raw value of your parameter. Already collected from the location of it's `in` key.
  * `spec`: This is the full "Parameter Object" specification. Allowing you to use schema keys as you'd like to decode and handle the parameter.

## x-handler

The `x-handler` async function is called with the following parameters:
  * `params`: Access to your parameters
  * `env`: Access to the current environment.

Lets break those down a little more.

### params

The `params` object will have a key for each name of your parameters.

That key once accessed gives you access to the `Parameter` class.

Calling `parse` on that class will call the `x-parse` function of the parameter.

For example:

```js
const token = params.token.parse();
```
### env

The `env` variable gives access to the `Environment` class.
Which provides access to details of the request/response object from ExpressJS, as well as
access to the rest of the server and some custom helper functions.
