# Cross-origin ajax cookie test

This is a stripped down test case for setting a cross-origin cookie
through ajax with different user agents. It consist of a source
component, from where such a request is issued and a target component
where the request is received and the cookie is set and evaluated.

This works without flaws in all modern browsers including IE11 on
Windows 10 but not on IE11 on Windows 7. You can make it work by
sending a mock `P3P` header, though. In IE<=9 you will have no luck
anyway because a usable implementation of CORS is missing (and
[`XDomainRequest` is way too restricted](https://blogs.msdn.microsoft.com/ieinternals/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds/))

## Usage

1. Clone this repository and `cd` into it's directory.
2. Install dependencies:

   ```
   npm install
   ```
   
3. Start the request source component:

   ```
   cd source
   npm start
   ```
   
    You are notified that this service runs on port `8100`.
4. In a separate terminal start the request target component:

   ```
   cd target
   npm start
   ```
   
   You are notified that this service runs on port `8200`.
5. Expose both services on different domains via https. You can easily
   do this on your machine using [`ngrok`](https://ngrok.com/) for one
   component and [`localtunnel`](https://localtunnel.github.io/www/) for the other:
   
   ```
   ngrok http 8100
   lt --port 8200
   ```
   
   Issue these commands on separate terminals. You are notified about
   the URLs your services are available publicly.
6. Open the URL of the source component, enter the URL of the target
   component into the input and submit the request. Optionally you can
   set the checkbox to have a `P3P` header set.
   
   You are redirected to the target component.If you are welcomed back
   by the target component, there were no problems with setting a cookie
   through a cross-origin ajax request.
