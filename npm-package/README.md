# @brycemarshall/exception

An extensible Typescript library of error types implementing the standard ECMAScript Error interface.

See also @brycemarshall/simple-exception (https://www.npmjs.com/package/@brycemarshall/simple-exception) which is a lighter-weight package which may be
better suited to some redistributable packages and yet which remains compatible with this fully-featured library.

## Installation

npm install @brycemarshall/exception

## The module exports the following types:

```ts
import { SimpleException } from '@brycemarshall/simple-exception';
/**
 * A convenience class which exposes static factory methods for constructing common typed error instances.
 */
export declare class ExceptionFactory {
    /**
     * Creates a new ApplicationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Application(message?: string, ...args: any[]): ApplicationException;
    /**
     * Creates a new ArgumentException instance.
     * @param parameterName The name of the invalid parameter.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Argument(parameterName: string, message?: string, ...args: any[]): ArgumentException;
    /**
     * Creates a new ArgumentNullException instance.
     * @param parameterName The name of the null parameter.
     */
    static ArgumentNull(parameterName: string): ArgumentNullException;
    /**
     * Creates a new ArgumentOutOfRangeException instance.
     * @param parameterName The name of the invalid parameter.
     * @param min The optional value of the lower inclusive boundary of the allowable range.
     * @param max The optional value of the upper inclusive boundary of the allowable range.
     */
    static ArgumentOutOfRange(parameterName: string, min?: any, max?: any): ArgumentOutOfRangeException;
    /**
     * Creates a new InvalidOperationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static InvalidOperation(message?: string, ...args: any[]): InvalidOperationException;
    /**
     * Creates a new NotSupportedException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static NotSupported(message?: string, ...args: any[]): NotSupportedException;
    /**
     * Creates a new IOException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static IO(message?: string, ...args: any[]): IOException;
    /**
     * Creates a new TimeoutException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Timeout(message?: string, ...args: any[]): TimeoutException;
    /**
     * Creates a new Exception instance with the implied type specified by the errorName parameter.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    static Custom(errorName: string, message?: string, ...args: any[]): Exception;
}
/**
 * The base class for custom error types implementing the standard ECMAScript Error interface.
 * Instances of this type may be instantiated directly (without subclassing) in order to create custom error instances.
 */
export declare class Exception extends SimpleException {
    /**
     * Creates a new Exception instance.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, message?: string, ...args: any[]);
    /**
     * Converts an Error object into an Exception if it is not already.
     * @param error The Error object to convert.
     */
    static convert(error: Error): Exception;
    /**
     * Returns true if the specified instance is an Error object, otherwise returns false.
     * @param value The value to test.
     */
    static isError(value: any): boolean;
    /**
     * Returns true if the specified instance is an Error object of the specified type, otherwise returns false.
     * @param value The value to test.
     */
    static isErrorOfType(value: any, errorName: string): boolean;
    /**
     * Returns true if the specified instance is an Exception object of the specified type, otherwise returns false.
     * @param value The value to test.
     */
    static isExceptionOfType(value: any, errorName: string): boolean;
    /**
     * Returns true if the specified instance is an Exception object, otherwise returns false.
     */
    static isException(value: any): boolean;
}
/**
 * An error type representing a general purpose application error.
 */
export declare class ApplicationException extends Exception {
    /**
     * Creates a new ApplicationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
    /**
     * Always returns true.
     */
    readonly isApplicationException: boolean;
}
/**
 * The base class for argument exception types.
 */
export declare abstract class ArgumentExceptionBase extends Exception {
    private _pname;
    /**
     * Creates a new ArgumentException instance.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param parameterName The name of the invalid parameter.
     * @param defaultMessage The default message describing the problem with the parameter.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, defaultMessage: string, parameterName: string, message?: string, ...args: any[]);
    /**
     * Returns the name of the invalid parameter.
     */
    readonly parameterName: string;
}
/**
 * The error raised when an invalid argument is passed to a function.
 */
export declare class ArgumentException extends ArgumentExceptionBase {
    /**
     * Creates a new ArgumentException instance.
     * @param parameterName The name of the invalid parameter.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(parameterName: string, message?: string, ...args: any[]);
    /**
     * Always returns true.
     */
    readonly isArgumentException: boolean;
}
/**
 * The error raised when an argument with a null value is illegally passed to a function.
 */
export declare class ArgumentNullException extends ArgumentExceptionBase {
    /**
     * Creates a new ArgumentNullException instance.
     * @param parameterName The name of the null parameter.
    */
    constructor(parameterName: string);
    /**
     * Always returns true.
     */
    readonly isArgumentNullException: boolean;
}
/**
 * The error raised when an argument passed to a function is outside of the legal range of allowable values required by the function.
 */
export declare class ArgumentOutOfRangeException extends ArgumentExceptionBase {
    /**
     * Creates a new ArgumentOutOfRangeException instance.
     * @param parameterName The name of the invalid parameter.
     * @param min The optional value of the lower inclusive boundary of the allowable range.
     * @param max The optional value of the upper inclusive boundary of the allowable range.
    */
    constructor(parameterName: string, min?: any, max?: any);
    private static formatBound(value);
    /**
     * Always returns true.
     */
    readonly isArgumentOutOfRangeException: boolean;
}
/**
 * The error raised when a requested operation is not valid due to the state of the implementing object when the operation was initiated.
 */
export declare class InvalidOperationException extends Exception {
    /**
     * Creates a new InvalidOperationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
    /**
     * Always returns true.
     */
    readonly isInvalidOperationException: boolean;
}
/**
 * The error raised when a requested operation is not supported by the implementing object.
 */
export declare class NotSupportedException extends Exception {
    /**
     * Creates a new NotSupportedException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
    /**
     * Always returns true.
     */
    readonly isNotSupportedException: boolean;
}
/**
 * The error raised when an IO error has occurred.
 */
export declare class IOException extends Exception {
    /**
     * Creates a new IOException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
    /**
     * Always returns true.
     */
    readonly isIOException: boolean;
}
/**
 * The error raised when an operation times-out before completing.
 */
export declare class TimeoutException extends Exception {
    /**
     * Creates a new TimeoutException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
    /**
     * Always returns true.
     */
    readonly isTimeoutException: boolean;
}
```

## Usage - ExceptionFactory

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

## Usage - Exception classes

Not all examples are shown.

```ts
import { ApplicationException } from '@brycemarshall/exception';
throw new ApplicationException("An error occurred");

import { ArgumentException } from '@brycemarshall/exception';
throw new ArgumentException("param1");

import { ArgumentNullException } from '@brycemarshall/exception';
throw new ArgumentNullException("param1");

import { ArgumentOutOfRangeException } from '@brycemarshall/exception';
throw new ArgumentOutOfRangeException("param1", 1, 10);

import { Exception } from '@brycemarshall/exception';
throw new Exception("MyCustomerErrorType");
throw new Exception("IncompatibleFoobar", "The Foobar {0} is incompatible with the Widget {1}", "Your Foobar", "My Widget");
throw new Exception("IncompatibleFoobar", "The Foobar {foobar} is incompatible with the Widget {widget}", { foobar: "Your Foobar", widget: "My Widget" });

```

## Usage - Exception Type Identification

```ts
try {
    throw new TimeoutException();
}
catch (e) {
    if (e.isTimeoutException)
        console.log("Caught a TimeoutException");
}
```
```ts
try {
    throw new TimeoutException();
}
catch (e) {
    if (Exception.isExceptionOfType(e, "Timeout")
        console.log("Caught a TimeoutException");
}
```
```ts
try {
    throw new CustomException("Foobar");
}
catch (e) {
    if (e.isFoobarException)
        console.log("Caught a FoobarException");
}
```
```ts
try {
    throw new CustomException("Foobar");
}
catch (e) {
    if (Exception.isExceptionOfType(e, "Foobar")
        console.log("Caught a FoobarException");
}
```
## Usage - Native Error Type Identification
```ts
try {
    throw new RangeError();
}
catch (e) {
    e = Exception.convert(e);
    if (e.isRangeErrorException)
        console.log("Caught an Error of type 'RangeError'");
}
```
```ts
try {
    throw new RangeError();
}
catch (e) {
    if (Exception.isErrorOfType(e, "RangeError")
        console.log("Caught an Error of type 'RangeError'");
}
```
```ts
try {
    throw new Error();
}
catch (e) {
    e = Exception.convert(e);
    if (e.isErrorException)
        console.log("Caught an Error of type 'Error'");
}
```

## Contributors

 - Bryce Marshall

## MIT Licenced
