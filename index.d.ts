/**
 * @class ExceptionFactory
 * A convenience class which exposes static factory methods for constructing common typed error instances.
 */
export declare class ExceptionFactory {
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
    static Custom(errorName: string, message?: string, ...args: any[]): Exception;
}
/**
 * @class Exception
 * The base class for custom error types implementing the standard ECMAScript Error interface.
 * Instances of this type may be instantiated directly (without subclassing) in order to create custom error instances.
 */
export declare class Exception extends Error {
    /**
     * @constructor
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, message?: string, ...args: any[]);
    private static resolveRootArgs(args);
    /**
     * @method toString - Returns the error message associated with this instance.
     */
    toString(): string;
}
/**
 * @class ApplicationException
 * An error type representing a general purpose application error.
 */
export declare class ApplicationException extends Exception {
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
export declare class ArgumentException extends Exception implements Exception {
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
export declare class ArgumentNullException extends Exception {
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
export declare class ArgumentOutOfRangeException extends Exception {
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
    */
    constructor(parameterName: string, min?: any, max?: any);
    private static formatBound(value);
}
/**
 * @class InvalidOperationException
 * The error raised when a requested operation is not valid due to the state of the implementing object when the operation was initiated.
 */
export declare class InvalidOperationException extends Exception {
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
export declare class NotSupportedException extends Exception {
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
export declare class IOException extends Exception {
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
export declare class TimeoutException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]);
}
