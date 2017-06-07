import { stringFormat } from '@brycemarshall/string-format';

/**
 * @class ExceptionFactory
 * A convenience class which exposes static factory methods for constructing common typed error instances.
 */
export class ExceptionFactory {
    /**
     * @method toString - Creates an instance of @type(ApplicationException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Application(message?: string, ...args: any[]): ApplicationException {
        return new ApplicationException(message, ...args);
    }

    /**
     * @method toString - Creates an instance of @type(ArgumentException).
     * @param parameterName - The name of the invalid parameter.
     */
    public static Argument(parameterName: string): ArgumentException {
        return new ArgumentException(parameterName);
    }

    /**
     * @method toString - Creates an instance of @type(ArgumentNullException).
     * @param parameterName - The name of the null parameter.
     */
    public static ArgumentNull(parameterName: string): ArgumentNullException {
        return new ArgumentNullException(parameterName);
    }

    /**
     * @method toString - Creates an instance of @type(ArgumentOutOfRangeException).
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
     */
    public static ArgumentOutOfRange(parameterName: string, min?: any, max?: any): ArgumentOutOfRangeException {
        return new ArgumentOutOfRangeException(parameterName, min, max);
    }

    /**
     * @method toString - Creates an instance of @type(InvalidOperationException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static InvalidOperation(message?: string, ...args: any[]): InvalidOperationException {
        return new InvalidOperationException(message, ...args);
    }

    /**
     * @method toString - Creates an instance of @type(NotSupportedException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static NotSupported(message?: string, ...args: any[]): NotSupportedException {
        return new NotSupportedException(message, ...args);
    }

    /**
     * @method toString - Creates an instance of @type(IOException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static IO(message?: string, ...args: any[]): IOException {
        return new IOException(message, ...args);
    }

    /**
     * @method toString - Creates an instance of @type(TimeoutException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Timeout(message?: string, ...args: any[]): TimeoutException {
        return new TimeoutException(message, ...args);
    }

    /**
     * @method toString - Creates an instance of @type(Exception) with the implied type specified in 'errorName'.
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Custom(errorName: string, message?: string, ...args: any[]): Exception {
        return new Exception(errorName, message, ...args);
    }
}

/**
 * @class Exception
 * The base class for custom error types implementing the standard ECMAScript Error interface.
 * Instances of this type may be instantiated directly (without subclassing) in order to create custom error instances.
 */
export class Exception extends Error {
    /**
     * @constructor
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, message?: string, ...args: any[]) {
        if (message && message.length > 0)
            if (args) message = stringFormat(message, ...args);

        if (!message)
            message = stringFormat("Error of type {0}", errorName);

        super(message);
        this.name = errorName;
    }

    /**
     * @method toString - Returns the error message associated with this instance.
     */
    public toString(): string {
        return this.message;
    }
}

/**
 * @class ApplicationException
 * An error type representing a general purpose application error.
 */
export class ApplicationException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("Application", message, ...args);
    }
}

/**
 * @class ArgumentException
 * The error raised when an invalid argument is passed to a function.
 */
export class ArgumentException extends Exception implements Exception {
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
    */
    constructor(parameterName: string) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        super("Argument", 'The argument "{0}" is invalid.', parameterName);
    }
}

/**
 * @class ArgumentNullException
 * The error raised when an argument with a null value is illegally passed to a function.
 */
export class ArgumentNullException extends Exception {
    /**
     * @constructor
     * @param parameterName - The name of the null parameter.
    */
    constructor(parameterName: string) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        super("ArgumentNull", 'The argument "{0}" cannot be null.', parameterName);
    }
}

/**
 * @class ArgumentOutOfRangeException
 * The error raised when an argument passed to a function is outside of the legal range of allowable values required by the function.
 */
export class ArgumentOutOfRangeException extends Exception {
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
    */
    constructor(parameterName: string, min?: any, max?: any) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        let message: string;
        if (min != null) {
            min = ArgumentOutOfRangeException.formatBound(min);
            if (max != null) {
                max = ArgumentOutOfRangeException.formatBound(max);
                message = 'The value of the argument "{0}" must be greater-than-or-equal to {1} and less-than-or-equal-to {2}.';
            }
            else
                message = 'The value of the argument "{0}" must be greater-than-or-equal to {1}.';
        }
        else
            message = 'The value of the argument "{0}" is outside of the allowable range.'

        super("ArgumentOutOfRange", message, parameterName, min, max);
    }

    private static formatBound(value: any): any {
        return (typeof (value) === "number") ? value : '"' + value + '"';
    }
}

/**
 * @class InvalidOperationException
 * The error raised when a requested operation is not valid due to the state of the implementing object when the operation was initiated.
 */
export class InvalidOperationException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("InvalidOperation", message != null ? message : 'Operation is not valid due to the current state of the object.', ...args);
    }
}

/**
 * @class NotSupportedException
 * The error raised when a requested operation is not supported by the implementing object.
 */
export class NotSupportedException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("NotSupported", message != null ? message : 'Operation is not supported.', ...args);
    }
}

/**
 * @class IOException
 * The error raised when an IO error has occurred.
 */
export class IOException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("IO", message != null ? message : 'An IO error occurred.', ...args);
    }
}

/**
 * @class TimeoutException
 * The error raised when an operation times-out before completing.
 */
export class TimeoutException extends Exception {
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("Timeout", message != null ? message : 'Operation timed-out before completing.', ...args);
    }
}