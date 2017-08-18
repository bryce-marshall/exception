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
     */
    static Argument(parameterName: string): ArgumentException;
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
 * The error raised when an invalid argument is passed to a function.
 */
export declare class ArgumentException extends Exception implements Exception {
    /**
     * Creates a new ArgumentException instance.
     * @param parameterName The name of the invalid parameter.
    */
    constructor(parameterName: string);
    /**
     * Always returns true.
     */
    readonly isArgumentException: boolean;
}
/**
 * The error raised when an argument with a null value is illegally passed to a function.
 */
export declare class ArgumentNullException extends Exception {
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
export declare class ArgumentOutOfRangeException extends Exception {
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
