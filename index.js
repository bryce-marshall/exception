"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var string_format_1 = require("@brycemarshall/string-format");
/**
 * @class ExceptionFactory
 * A convenience class which exposes static factory methods for constructing common typed error instances.
 */
var ExceptionFactory = (function () {
    function ExceptionFactory() {
    }
    /**
     * @method toString - Creates an instance of @type(ApplicationException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    ExceptionFactory.Application = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (ApplicationException.bind.apply(ApplicationException, [void 0, message].concat(args)))();
    };
    /**
     * @method toString - Creates an instance of @type(ArgumentException).
     * @param parameterName - The name of the invalid parameter.
     */
    ExceptionFactory.Argument = function (parameterName) {
        return new ArgumentException(parameterName);
    };
    /**
     * @method toString - Creates an instance of @type(ArgumentNullException).
     * @param parameterName - The name of the null parameter.
     */
    ExceptionFactory.ArgumentNull = function (parameterName) {
        return new ArgumentNullException(parameterName);
    };
    /**
     * @method toString - Creates an instance of @type(ArgumentOutOfRangeException).
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
     */
    ExceptionFactory.ArgumentOutOfRange = function (parameterName, min, max) {
        return new ArgumentOutOfRangeException(parameterName, min, max);
    };
    /**
     * @method toString - Creates an instance of @type(InvalidOperationException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    ExceptionFactory.InvalidOperation = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (InvalidOperationException.bind.apply(InvalidOperationException, [void 0, message].concat(args)))();
    };
    /**
     * @method toString - Creates an instance of @type(NotSupportedException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    ExceptionFactory.NotSupported = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (NotSupportedException.bind.apply(NotSupportedException, [void 0, message].concat(args)))();
    };
    /**
     * @method toString - Creates an instance of @type(IOException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    ExceptionFactory.IO = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (IOException.bind.apply(IOException, [void 0, message].concat(args)))();
    };
    /**
     * @method toString - Creates an instance of @type(TimeoutException).
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    ExceptionFactory.Timeout = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new (TimeoutException.bind.apply(TimeoutException, [void 0, message].concat(args)))();
    };
    /**
     * @method toString - Creates an instance of @type(Exception) with the implied type specified in 'errorName'.
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
     */
    ExceptionFactory.Custom = function (errorName, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return new (Exception.bind.apply(Exception, [void 0, errorName, message].concat(args)))();
    };
    return ExceptionFactory;
}());
exports.ExceptionFactory = ExceptionFactory;
/**
 * @class Exception
 * The base class for custom error types implementing the standard ECMAScript Error interface.
 * Instances of this type may be instantiated directly (without subclassing) in order to create custom error instances.
 */
var Exception = (function (_super) {
    __extends(Exception, _super);
    /**
     * @constructor
     * @param errorName - The name (implied type) of the Error object implemented by this instance.
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    function Exception(errorName, message) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var _this = this;
        if (message && message.length > 0)
            if (args)
                message = string_format_1.stringFormat.apply(void 0, [message].concat(args));
        if (!message)
            message = string_format_1.stringFormat("Error of type {0}", errorName);
        _this = _super.call(this, message) || this;
        _this.name = errorName;
        return _this;
    }
    /**
     * @method toString - Returns the error message associated with this instance.
     */
    Exception.prototype.toString = function () {
        return this.message;
    };
    return Exception;
}(Error));
exports.Exception = Exception;
/**
 * @class ApplicationException
 * An error type representing a general purpose application error.
 */
var ApplicationException = (function (_super) {
    __extends(ApplicationException, _super);
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    function ApplicationException(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, ["Application", message].concat(args)) || this;
    }
    return ApplicationException;
}(Exception));
exports.ApplicationException = ApplicationException;
/**
 * @class ArgumentException
 * The error raised when an invalid argument is passed to a function.
 */
var ArgumentException = (function (_super) {
    __extends(ArgumentException, _super);
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
    */
    function ArgumentException(parameterName) {
        var _this = this;
        if (parameterName == null)
            throw new ArgumentNullException("parameterName");
        _this = _super.call(this, "Argument", 'The argument "{0}" is invalid.', parameterName) || this;
        return _this;
    }
    return ArgumentException;
}(Exception));
exports.ArgumentException = ArgumentException;
/**
 * @class ArgumentNullException
 * The error raised when an argument with a null value is illegally passed to a function.
 */
var ArgumentNullException = (function (_super) {
    __extends(ArgumentNullException, _super);
    /**
     * @constructor
     * @param parameterName - The name of the null parameter.
    */
    function ArgumentNullException(parameterName) {
        var _this = this;
        if (parameterName == null)
            throw new ArgumentNullException("parameterName");
        _this = _super.call(this, "ArgumentNull", 'The argument "{0}" cannot be null.', parameterName) || this;
        return _this;
    }
    return ArgumentNullException;
}(Exception));
exports.ArgumentNullException = ArgumentNullException;
/**
 * @class ArgumentOutOfRangeException
 * The error raised when an argument passed to a function is outside of the legal range of allowable values required by the function.
 */
var ArgumentOutOfRangeException = (function (_super) {
    __extends(ArgumentOutOfRangeException, _super);
    /**
     * @constructor
     * @param parameterName - The name of the invalid parameter.
     * @param min - The optional value of the lower inclusive boundary of the allowable range.
     * @param max - The optional value of the upper inclusive boundary of the allowable range.
    */
    function ArgumentOutOfRangeException(parameterName, min, max) {
        var _this = this;
        if (parameterName == null)
            throw new ArgumentNullException("parameterName");
        var message;
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
            message = 'The value of the argument "{0}" is outside of the allowable range.';
        _this = _super.call(this, "ArgumentOutOfRange", message, parameterName, min, max) || this;
        return _this;
    }
    ArgumentOutOfRangeException.formatBound = function (value) {
        return (typeof (value) === "number") ? value : '"' + value + '"';
    };
    return ArgumentOutOfRangeException;
}(Exception));
exports.ArgumentOutOfRangeException = ArgumentOutOfRangeException;
/**
 * @class InvalidOperationException
 * The error raised when a requested operation is not valid due to the state of the implementing object when the operation was initiated.
 */
var InvalidOperationException = (function (_super) {
    __extends(InvalidOperationException, _super);
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    function InvalidOperationException(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, ["InvalidOperation", message != null ? message : 'Operation is not valid due to the current state of the object.'].concat(args)) || this;
    }
    return InvalidOperationException;
}(Exception));
exports.InvalidOperationException = InvalidOperationException;
/**
 * @class NotSupportedException
 * The error raised when a requested operation is not supported by the implementing object.
 */
var NotSupportedException = (function (_super) {
    __extends(NotSupportedException, _super);
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    function NotSupportedException(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, ["NotSupported", message != null ? message : 'Operation is not supported.'].concat(args)) || this;
    }
    return NotSupportedException;
}(Exception));
exports.NotSupportedException = NotSupportedException;
/**
 * @class IOException
 * The error raised when an IO error has occurred.
 */
var IOException = (function (_super) {
    __extends(IOException, _super);
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    function IOException(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, ["IO", message != null ? message : 'An IO error occurred.'].concat(args)) || this;
    }
    return IOException;
}(Exception));
exports.IOException = IOException;
/**
 * @class TimeoutException
 * The error raised when an operation times-out before completing.
 */
var TimeoutException = (function (_super) {
    __extends(TimeoutException, _super);
    /**
     * @constructor
     * @param message - An optional error message (which may be a string formatting template).
     * @param args - Optional format arguments to be applied to a string formatting template specified in 'message'.
    */
    function TimeoutException(message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _super.apply(this, ["Timeout", message != null ? message : 'Operation timed-out before completing.'].concat(args)) || this;
    }
    return TimeoutException;
}(Exception));
exports.TimeoutException = TimeoutException;
//# sourceMappingURL=index.js.map