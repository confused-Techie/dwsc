# OAS Document

With DWSC you use a customized OAS document to configure nearly everything about
your web server and how it behaves and responds.

For those familiar with an OAS document you know it is used to define the way to interact
with your web server, such as the paths available, the parameters it accepts, etc.

But there's nothing in there that determines how it actually behaves. This is where the DWSC
customizations come into use. So lets define those below.

## `x-dwsc`
> Located: OpenAPI Object

The extension key `dwsc` is used to define a version of DWSC that your document is
intended to be used with.

This property is currently unused, but good practice to include.

## `paths.<path>`
> Located: Paths Object

A note about paths, path templating in OAS and ExpressJS (which is what is used under the hood
in DWSC) is different. But ensure to use only OAS path templating in your document, which will
be converted to an ExpressJS compatible format.

## `paths.<path>.<operation>`
> Located: Path Item Object

Another important note about operations (HTTP Methods).

OAS only supports the following operations:
  * GET
  * PUT
  * POST
  * DELETE
  * OPTIONS
  * HEAD
  * PATCH
  * TRACE

These are available by the basic lowercase form of each method name.

But DWSC provides support for additional operations. All prefixed with `x-`.
Supporting the following additional operations:
  * CHECKOUT
  * COPY
  * LOCK
  * MERGE
  * MKACTIVITY
  * MKCOL
  * MOVE
  * M-SEARCH
  * NOTIFY
  * PURGE
  * REPORT
  * SEARCH
  * SUBSCRIBE
  * UNLOCK
  * UNSUBSCRIBE

## `paths.<path>.<operation>.x-responder`

The `x-responder` object allows you to pre-define possible responses of your data.

TODO: This is worthless, identical data being displayed as a "Response Object".

## `paths.<path>.<operation>.parameters.x-parse`
> Located: Parameter Object

The `x-parse` key in any Parameter Object allows you to provide a function to
handle parsing said parameter.

## `paths.<path>.<operation>.x-handler`
> Located: Path Item Object

Within your Path Item Object the `x-handler` key allows defining a function that will
be what is called to actually handle any requests to this endpoint.

Within this function is where all logic of this endpoint will occur.

In addition to the `handler` function you may also define `prehandler` which is called
prior to the `handler`. Or a `posthandler` which is called after the `handler` function.
