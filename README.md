# axios-error-handler

[![CI](https://github.com/Jszigeti/axios-error-handler/actions/workflows/ci.yml/badge.svg)](https://github.com/Jszigeti/axios-error-handler/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/axios-error-handler-ts.svg)](https://badge.fury.io/js/axios-error-handler-ts)
[![npm downloads](https://img.shields.io/npm/dm/axios-error-handler-ts.svg)](https://www.npmjs.com/package/axios-error-handler-ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple and flexible error handler for Axios requests, allowing customizable error messages based on HTTP status codes. It helps manage API error responses by providing clear and customized messages depending on the status code returned by the server.
[![npm version](https://badge.fury.io/js/axios-error-handler-ts.svg)](https://badge.fury.io/js/axios-error-handler-ts)

A simple and flexible error handler for Axios requests, allowing customizable error messages based on HTTP status codes. It helps manage API error responses by providing clear and customized messages depending on the status code returned by the server.

## Installation

To install `axios-error-handler-ts`, you can use npm or yarn:

### Using npm

```bash
npm install axios-error-handler-ts
```

### Using yarn

```bash
yarn add axios-error-handler-ts
```

## Usage

You can use `axios-error-handler-ts` to handle errors in your Axios requests by customizing error messages based on HTTP status codes.

### Basic Usage (Single Status Code)

```typescript
import { handleError } from 'axios-error-handler-ts';

// Example function
handleError(error, 403, 'Email or password incorrect.');
// If AxiosError and status === 403: 'Email or password incorrect.'
```

### Advanced Usage (Multiple Status Codes)

You can also provide custom error messages for multiple HTTP status codes:

```typescript
import { handleError } from 'axios-error-handler-ts';

// Example function
handleError(error, {
  403: 'You are not allowed to access this resource.',
  404: 'Group is not found.',
});
// If AxiosError and status === 403: 'You are not allowed to access this resource.'
// If AxiosError and status === 404: 'Group is not found.'
```

### Global Usage (Only Message Provided)

You can only provide a string and if the error is AxiosInstance and not related to a server one, the handler will return the global message.

```typescript
import { handleError } from 'axios-error-handler-ts';

// Example function
handleError(error, 'You are not allowed to access this resource.');
// If AxiosError and status === 401: 'You are not allowed to access this resource.'
// If AxiosError and status === 403: 'You are not allowed to access this resource.'
// If AxiosError and status === 500: 'A server error occurred. Please try again later.'
```

### Server Error Handling

If the error status doesn't match any of the provided codes and is related to a server error (status 500+), the handler will return a default server error message.

```typescript
import { handleError } from 'axios-error-handler-ts';

// Example function
handleError(error, 403, 'Email or password incorrect.');
// If AxiosError and status === 500: 'A server error occurred. Please try again later.'
```

### Default Error Handling

If the error status doesn't match any of the provided codes, the handler will return a default error message.

```typescript
import { handleError } from 'axios-error-handler-ts';

// Example function
handleError(error, 403, 'Email or password incorrect.');
// If AxiosError and status !== 403 | status > 500: 'An unknown error occurred.'
// If generic Error : error.message
// If unknown error : 'An unknown error occurred.'
```

### Options

#### `errorMessages` (required)

- **Type**: `string | Record<number, string>`
- **Description**: The custom error message(s) for the specified status code(s). If you pass a single string, it will be used for all errors. If passing a `Record<number, string>`, the object keys represent status codes, and values represent corresponding error messages.

If passing a `Record<number, string>`, must not fill `errorCodesToCheck`, the object keys represent status codes and values represent corresponding error messages.

#### `errorCodeToCheck` (optional)

- **Type**: `number`
- **Description**: The specific status code to check for in the Axios error response. Must be specified if `errorMessages` is a string.

#### `serverErrorMessage` (optional)

- **Type**: `string`
- **Description**: The message to show for server errors (status codes >= 500). Default is 'A server error occurred. Please try again later.'

#### `unknownErrorMessage` (optional)

- **Type**: `string`
- **Description**: The message to show when the error type is unknown. Default is 'An unknown error occurred.'

## Example

```typescript
import { handleError } from 'axios-error-handler-ts';

try {
  // Axios request here
} catch (error: unknown) {
  const errorMessage = handleError(error, {
    403: 'You are not authorized to access this resource.',
    404: 'Requested resource not found.',
  });

  console.log(errorMessage);
  // Output the error message :
  // If AxiosError and status === 403: 'You are not authorized to access this resource.'
  // If AxiosError and status === 404: 'Requested resource not found.'
  // If Axios Error and status >= 500: 'A server error occurred. Please try again later.'
  // If Axios Error and status < 500 | status !== 403 | status !== 404: 'An unknown error occurred.'
  // If Error : error.message
  // If unknown error : 'An unknown error occurred.'
}
```

## Development

To contribute to the project, clone the repository and install dependencies:

```bash
git clone https://github.com/Jszigeti/axios-error-handler.git
cd axios-error-handler
npm install
```

### Running Tests

The project uses Jest for testing. To run the tests, use the following command:

```bash
npm test
```

### Building

To compile the TypeScript code into JavaScript, run:

```bash
npm run build
```

This will generate the compiled code in the `dist` directory. The compiled files are then published to npm instead of the TypeScript source files.

## License

This project is licensed under the MIT License.
