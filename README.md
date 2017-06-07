# @brycemarshall/exception

An extensible Typescript library of error types implementing the standard ECMAScript Error interface.

## Installation

`npm install @brycemarshall/exception`

# The module exports the following types:

```ts
/**
 * @class ExceptionFactory
 * A convenience class which exposes static factory methods for constructing common typed error instances.
 */
class ExceptionFactory {
    /**
     * @method toString - Creates an instance of @type(ApplicationException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Application(message?: string, ...args: any[]): ApplicationException;
    /**
     * @method toString - Creates an instance of @type(ArgumentException).
     * @param parameterName - The name of the invalid parameter.
     */
    static Argument(parameterName: string): ArgumentException;
    /**
     * @method toString - Creates an instance of @type(ArgumentNullException).
     * @param parameterName - The name of the null parameter.
     */
    static ArgumentNull(parameterName: string): ArgumentNullException;
    /**
     * @method toString - Creates an instance of @type(ArgumentOutOfRangeException).
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
     */
    static ArgumentOutOfRange(parameterName: string, min?: any, max?: any): ArgumentOutOfRangeException;
    /**
     * @method toString - Creates an instance of @type(InvalidOperationException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static InvalidOperation(message?: string, ...args: any[]): InvalidOperationException;
    /**
     * @method toString - Creates an instance of @type(NotSupportedException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static NotSupported(message?: string, ...args: any[]): NotSupportedException;
    /**
     * @method toString - Creates an instance of @type(IOException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static IO(message?: string, ...args: any[]): IOException;
    /**
     * @method toString - Creates an instance of @type(TimeoutException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Timeout(message?: string, ...args: any[]): TimeoutException;
    /**
     * @method toString - Creates an instance of @type(Exception) with the implied type specified in 'errorName'.
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Custom(errorName: string, message?: string, args?: any[]): Exception;
}
/**
 * @class Exception
 * The base class for custom error types implementing the standard ECMAScript Error interface.
 * Instances of this type may be instantiated directly (without subclassing) in order to create custom error instances.
 */
class Exception extends Error {
    /**
     * @constructor
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, message?: string, ...args: any[]);
    /**
     * @method toString - Returns the error message associated with this instance.
     */
    toString(): string;
}
/**
 * @class ApplicationException
 * An error type representing a general purpose application error.
 */
class ApplicationException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
}
/**
 * @class ArgumentException
 * The error raised when an invalid argument is passed to a function.
 */
class ArgumentException extends Exception implements Exception {
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
    */
    constructor(parameterName: string);
}
/**
 * @class ArgumentNullException
 * The error raised when an argument with a null value is illegally passed to a function.
 */
class ArgumentNullException extends Exception {
    /**
     * @constructor
     * @param parameterName - The name of the null parameter.
    */
    constructor(parameterName: string);
}
/**
 * @class ArgumentOutOfRangeException
 * The error raised when an argument passed to a function is outside of the legal range of allowable values required by the function.
 */
class ArgumentOutOfRangeException extends Exception {
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
    */
    constructor(parameterName: string, min?: any, max?: any);
}
/**
 * @class InvalidOperationException
 * The error raised when a requested operation is not valid due to the state of the implementing object when the operation was initiated.
 */
class InvalidOperationException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
}
/**
 * @class NotSupportedException
 * The error raised when a requested operation is not supported by the implementing object.
 */
class NotSupportedException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
}
/**
 * @class IOException
 * The error raised when an IO error has occurred.
 */
class IOException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
}
/**
 * @class TimeoutException
 * The error raised when an operation times-out before completing.
 */
class TimeoutException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
}
```

# Usage - ExceptionFactory

```ts
import { ExceptionFactory } from '@brycemarshall/exception';

throw ExceptionFactory.Application();
throw ExceptionFactory.Application("An error occurred");
throw ExceptionFactory.InvalidOperation();
throw ExceptionFactory.InvalidOperation("You shouldn't have done that");
throw ExceptionFactory.NotSupported();
throw ExceptionFactory.NotSupported("The rotate Widget operation is not supported");
throw ExceptionFactory.Argument("param1");
throw ExceptionFactory.ArgumentNull("param1");
throw ExceptionFactory.ArgumentOutOfRange("param1", 1, 10);
throw ExceptionFactory.ArgumentOutOfRange("param1", "a", "z");
throw ExceptionFactory.ArgumentNull("param1");
throw ExceptionFactory.IO();
throw ExceptionFactory.IO("Writing to the Widget stream failed");
throw ExceptionFactory.Timeout();
throw ExceptionFactory.Timeout("Timed-out waiting for a response from the Widget");
throw ExceptionFactory.Custom("MyCustomerErrorType");
throw ExceptionFactory.Custom("IncompatibleFoobar", "The Foobar {0} is incompatible with the Widget {1}", "Your Foobar", "My Widget");
throw ExceptionFactory.Custom("IncompatibleFoobar", "The Foobar {foobar} is incompatible with the Widget {widget}", { foobar: "Your Foobar", widget: "My Widget" });

```

# Usage - Exception classes 

```ts
import { ApplicationException } from '@brycemarshall/exception';
throw new ApplicationException("An error occurred");

import { ArgumentNullException } from '@brycemarshall/exception';
throw new ArgumentNullException("param1");

import { ArgumentOutOfRangeException } from '@brycemarshall/exception';
throw new ArgumentOutOfRangeException("param1", 1, 10);

import { Exception } from '@brycemarshall/exception';
throw new Exception("MyCustomerErrorType");
throw new Exception("IncompatibleFoobar", "The Foobar {1} is incompatible with the Widget {2}", "Your Foobar", "My Widget");
throw new Exception("IncompatibleFoobar", "The Foobar {foobar} is incompatible with the Widget {2}", { foobar: "Your Foobar", widget: "My Widget" });

```
## Contributors

 - Bryce Marshall

## MIT Licenced