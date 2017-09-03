import { SimpleException } from '@brycemarshall/simple-exception';
import { stringFormat } from '@brycemarshall/string-format';

/**
 * A convenience class which exposes static factory methods for constructing common typed error instances.
 */
export class ExceptionFactory {
    /**
     * Creates a new ApplicationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Application(message?: string, ...args: any[]): ApplicationException {
        return new ApplicationException(message, ...args);
    }

    /**
     * Creates a new ArgumentException instance.
     * @param parameterName The name of the invalid parameter.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Argument(parameterName: string, message?: string, ...args: any[]): ArgumentException {
        return new ArgumentException(parameterName, message, ...args);
    }

    /**
     * Creates a new ArgumentNullException instance.
     * @param parameterName The name of the null parameter.
     */
    public static ArgumentNull(parameterName: string): ArgumentNullException {
        return new ArgumentNullException(parameterName);
    }

    /**
     * Creates a new ArgumentOutOfRangeException instance.
     * @param parameterName The name of the invalid parameter.
     * @param min The optional value of the lower inclusive boundary of the allowable range.
     * @param max The optional value of the upper inclusive boundary of the allowable range.
     */
    public static ArgumentOutOfRange(parameterName: string, min?: any, max?: any): ArgumentOutOfRangeException {
        return new ArgumentOutOfRangeException(parameterName, min, max);
    }

    /**
     * Creates a new InvalidOperationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static InvalidOperation(message?: string, ...args: any[]): InvalidOperationException {
        return new InvalidOperationException(message, ...args);
    }

    /**
     * Creates a new NotSupportedException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static NotSupported(message?: string, ...args: any[]): NotSupportedException {
        return new NotSupportedException(message, ...args);
    }

    /**
     * Creates a new IOException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static IO(message?: string, ...args: any[]): IOException {
        return new IOException(message, ...args);
    }

    /**
     * Creates a new TimeoutException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Timeout(message?: string, ...args: any[]): TimeoutException {
        return new TimeoutException(message, ...args);
    }

    /**
     * Creates a new Exception instance with the implied type specified by the errorName parameter.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    public static Custom(errorName: string, message?: string, ...args: any[]): Exception {
        return new Exception(errorName, message, ...args);
    }
}

/**
 * The base class for custom error types implementing the standard ECMAScript Error interface.
 * Instances of this type may be instantiated directly (without subclassing) in order to create custom error instances.
 */
export class Exception extends SimpleException {
    /**
     * Creates a new Exception instance.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, message?: string, ...args: any[]) {
        if (message && message.length > 0)
            if (args && args.length > 0) message = stringFormat(message, ...args);

        super(errorName, message);
    }

    /**
     * Converts an Error object into an Exception if it is not already.
     * @param error The Error object to convert.
     */
    static convert(error: Error): Exception {
        return SimpleException.convert(error);
    }

    /**
     * Returns true if the specified instance is an Error object, otherwise returns false.
     * @param value The value to test.
     */
    static isError(value: any) {
        return SimpleException.isError(value);
    }

    /**
     * Returns true if the specified instance is an Error object of the specified type, otherwise returns false.
     * @param value The value to test.
     */
    static isErrorOfType(value: any, errorName: string) {
        if (errorName == null) throw new ArgumentNullException("errorName");
        return SimpleException.isError(value) && value.name == errorName;
    }

    /**
     * Returns true if the specified instance is an Exception object of the specified type, otherwise returns false.
     * @param value The value to test.
     */
    static isExceptionOfType(value: any, errorName: string) {
        if (errorName == null) throw new ArgumentNullException("errorName");
        return Exception.isErrorOfType(value, errorName) && value.isException === true;
    }

    /**
     * Returns true if the specified instance is an Exception object, otherwise returns false.
     */
    static isException(value: any): boolean {
        return SimpleException.isError(value) && value.isException === true;
    }
}

/**
 * An error type representing a general purpose application error.
 */
export class ApplicationException extends Exception {
    /**
     * Creates a new ApplicationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("Application", message, ...args);
    }

    /**
     * Always returns true.
     */
    get isApplicationException(): boolean {
        return true;
    }
}

/**
 * The base class for argument exception types.
 */
export abstract class ArgumentExceptionBase extends Exception {
    private _pname: string;
    /**
     * Creates a new ArgumentException instance.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param parameterName The name of the invalid parameter.
     * @param defaultMessage The default message describing the problem with the parameter.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, defaultMessage: string, parameterName: string, message?: string, ...args: any[]) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        if (message != null && message.length > 0)
            defaultMessage += (" " + message);

        super(errorName, defaultMessage, ...args);
        this._pname = parameterName;

        // Workaround prototype issues when extending Error object
        if (this["parameterName"] == undefined) {
            (<any>this)["parameterName"] = parameterName;
        }
    }

    /**
     * Returns the name of the invalid parameter.
     */
    get parameterName(): string {
        return this._pname;
    }
}

/**
 * The error raised when an invalid argument is passed to a function.
 */
export class ArgumentException extends ArgumentExceptionBase {
    /**
     * Creates a new ArgumentException instance.
     * @param parameterName The name of the invalid parameter.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(parameterName: string, message?: string, ...args: any[]) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        super("Argument", stringFormat('The argument "{0}" is invalid.', parameterName), parameterName, message, ...args);
    }

    /**
     * Always returns true.
     */
    get isArgumentException(): boolean {
        return true;
    }
}

/**
 * The error raised when an argument with a null value is illegally passed to a function.
 */
export class ArgumentNullException extends ArgumentExceptionBase {
    /**
     * Creates a new ArgumentNullException instance.
     * @param parameterName The name of the null parameter.
    */
    constructor(parameterName: string) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        super("ArgumentNull", stringFormat('The argument "{0}" cannot be null.', parameterName), parameterName);
    }

    /**
     * Always returns true.
     */
    get isArgumentNullException(): boolean {
        return true;
    }
}

/**
 * The error raised when an argument passed to a function is outside of the legal range of allowable values required by the function.
 */
export class ArgumentOutOfRangeException extends ArgumentExceptionBase {
    /**
     * Creates a new ArgumentOutOfRangeException instance.
     * @param parameterName The name of the invalid parameter.
     * @param min The optional value of the lower inclusive boundary of the allowable range.
     * @param max The optional value of the upper inclusive boundary of the allowable range.
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

        super("ArgumentOutOfRange", stringFormat(message, parameterName, min, max), parameterName);
    }

    private static formatBound(value: any): any {
        return (typeof (value) === "number") ? value : '"' + value + '"';
    }

    /**
     * Always returns true.
     */
    get isArgumentOutOfRangeException(): boolean {
        return true;
    }
}

/**
 * The error raised when a requested operation is not valid due to the state of the implementing object when the operation was initiated.
 */
export class InvalidOperationException extends Exception {
    /**
     * Creates a new InvalidOperationException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("InvalidOperation", message != null ? message : 'Operation is not valid due to the current state of the object.', ...args);
    }

    /**
     * Always returns true.
     */
    get isInvalidOperationException(): boolean {
        return true;
    }
}

/**
 * The error raised when a requested operation is not supported by the implementing object.
 */
export class NotSupportedException extends Exception {
    /**
     * Creates a new NotSupportedException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("NotSupported", message != null ? message : 'Operation is not supported.', ...args);
    }

    /**
     * Always returns true.
     */
    get isNotSupportedException(): boolean {
        return true;
    }
}

/**
 * The error raised when an IO error has occurred.
 */
export class IOException extends Exception {
    /**
     * Creates a new IOException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("IO", message != null ? message : 'An IO error occurred.', ...args);
    }

    /**
     * Always returns true.
     */
    get isIOException(): boolean {
        return true;
    }
}

/**
 * The error raised when an operation times-out before completing.
 */
export class TimeoutException extends Exception {
    /**
     * Creates a new TimeoutException instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(message?: string, ...args: any[]) {
        super("Timeout", message != null ? message : 'Operation timed-out before completing.', ...args);
    }

    /**
     * Always returns true.
     */
    get isTimeoutException(): boolean {
        return true;
    }
}
