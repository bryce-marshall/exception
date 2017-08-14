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
     */
    public static Argument(parameterName: string): ArgumentException {
        return new ArgumentException(parameterName);
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
export class Exception extends Error {
    /**
     * Creates a new Exception instance.
     * @param errorName The name (implied type) of the Error object implemented by this instance.
     * @param message An optional error message (which may be a string formatting template).
     * @param args Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    constructor(errorName: string, message?: string, ...args: any[]) {
        if (message && message.length > 0)
            if (args) message = stringFormat(message, ...args);

        if (!message)
            message = stringFormat("Error of type {0}", errorName);

        super(message);
        this.message = message;
        this.name = errorName;

        Exception.convert(this);
    }

    /**
     * Returns the error message associated with this instance.
     */
    public toString(): string {
        return this.message;
    }

    /**
     * Always returns true.
     */
    get isException(): boolean {
        return true;
    }

    /**
     * Converts an Error object into an Exception if it is not already.
     * @param error The Error object to convert.
     */
    static convert(error: Error): Exception {
        if (error == null) throw new ArgumentNullException("error");
        if (!Exception.isError(error)) throw new ArgumentException("error");
        let evalProp = "is" + error.name + "Exception";

        // When called from the Exception contructor, the following is to work-around the Typescript ES5 compiler bug that incorrectly subclasses the Error object resulting in members defined on the immediate subclass being lost.
        // See https://github.com/Microsoft/TypeScript/issues/10166
        if (error["isException"] == undefined) {
            (<any>error)["isException"] = Exception.prototype.isException;
            if (error[evalProp] == undefined) // Don't reassign the toString method on native Error instances.
                (<any>error)["toString"] = Exception.prototype.toString;
        }

        // For custom exceptions or other subclassed exceptions where the "is...Exception" property has not been defined.
        if (error[evalProp] == undefined) {
            error[evalProp] = Exception.prototype.isException;
        }
        
        return <Exception>error;
    }

    /**
     * Returns true if the specified instance is an Error object, otherwise returns false.
     * @param value The value to test.
     */
    static isError(value: any) {
        return value && typeof (value.message) == "string" && typeof (value.stack) == "string" && typeof (value.name) == "string";
    }

    /**
     * Returns true if the specified instance is an Error object of the specified type, otherwise returns false.
     * @param value The value to test.
     */
    static isErrorOfType(value: any, errorName: string) {
        if (errorName == null) throw new ArgumentNullException("errorName");
        return value && typeof (value.message) == "string" && typeof (value.stack) == "string" && value.name == errorName;
    }

    /**
     * Returns true if the specified instance is an Exception object of the specified type, otherwise returns false.
     * @param value The value to test.
     */
    static isExceptionOfType(value: any, errorName: string) {
        if (errorName == null) throw new ArgumentNullException("errorName");
        return value && value.isException === true && value["is" + errorName + "Exception"] === true;
    }

    /**
     * Returns true if the specified instance is an Exception object, otherwise returns false.
     */
    static isException(value: any): boolean {
        return value && value.isException === true;
    }

    /**
     * Returns true if the value is an ApplicationException, otherwise returns false.
     */
    static isApplicationException(value: any): boolean {
        return Exception.isException(value) && value.isApplicationException === true;
    }

    /**
     * Returns true if the value is an ArgumentException, otherwise returns false.
     */
    static isArgumentException(value: any): boolean {
        return Exception.isException(value) && value.isArgumentException === true;
    }

    /**
     * Returns true if the value is an ArgumentNullException, otherwise returns false.
     */
    static isArgumentNullException(value: any): boolean {
        return Exception.isException(value) && value.isArgumentNullException === true;
    }

    /**
     * Returns true if the value is an isArgumentOutOfRangeException, otherwise returns false.
     */
    static isArgumentOutOfRangeException(value: any): boolean {
        return Exception.isException(value) && value.isArgumentOutOfRangeException === true;
    }

    /**
     * Returns true if the value is an InvalidOperationException, otherwise returns false.
     */
    static isInvalidOperationException(value: any): boolean {
        return Exception.isException(value) && value.isInvalidOperationException === true;
    }

    /**
     * Returns true if the value is a NotSupportedException, otherwise returns false.
     */
    static isNotSupportedException(value: any): boolean {
        return Exception.isException(value) && value.isNotSupportedException === true;
    }

    /**
     * Returns true if the value is an IOException, otherwise returns false.
     */
    static isIOException(value: any): boolean {
        return Exception.isException(value) && value.isIOException === true;
    }

    /**
     * Returns true if the value is a TimeoutException, otherwise returns false.
     */
    static isTimeoutException(value: any): boolean {
        return Exception.isException(value) && value.isTimeoutException === true;
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
 * The error raised when an invalid argument is passed to a function.
 */
export class ArgumentException extends Exception implements Exception {
    /**
     * Creates a new ArgumentException instance.
     * @param parameterName The name of the invalid parameter.
    */
    constructor(parameterName: string) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        super("Argument", 'The argument "{0}" is invalid.', parameterName);
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
export class ArgumentNullException extends Exception {
    /**
     * Creates a new ArgumentNullException instance.
     * @param parameterName The name of the null parameter.
    */
    constructor(parameterName: string) {
        if (parameterName == null) throw new ArgumentNullException("parameterName");
        super("ArgumentNull", 'The argument "{0}" cannot be null.', parameterName);
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
export class ArgumentOutOfRangeException extends Exception {
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

        super("ArgumentOutOfRange", message, parameterName, min, max);
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
