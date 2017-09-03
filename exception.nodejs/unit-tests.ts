import { Exception, ExceptionFactory } from './package-src/index';
import { stringFormat } from '@brycemarshall/string-format';

export interface IUnitTest {
    name: string;
    executed: boolean
    passed: boolean;
    error: any;
    execute();
}

export class UnitTest implements IUnitTest {
    private _name: string;
    private _executed: boolean;
    private _passed: boolean;
    private _error: any;

    constructor(name: string, private fn: Function) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get executed(): boolean {
        return this._executed;
    }

    get passed(): boolean {
        return this._passed;
    }

    get error(): any {
        return this._error;
    }

    execute() {
        console.log("Executing test \"" + this.name + "\"");
        try {
            this.fn();
            this._passed = true;
        }
        catch (e) {
            this._passed = false;
            this._error = e;
        };

        console.log("Passed: " + this._passed);
        if (!this._passed)
            console.log(this._error.message);
        console.log("");
        this._executed = true;
    }
}

const assert = (condition, message?: string) => {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
};

const assertEqual = (expectedValue, actualValue, message?: string) => {
    let m = "AssertEqual failed";
    if (message)
        m = m + ": " + message;
    console.log('Expected Value: "' + expectedValue + '"; Actual Value: "' + actualValue + '"');
    assert(expectedValue === actualValue, m);
};

const assertError = (error: Error, expectedType: string, expectedMessage?: string) => {
    console.log('Expected Type: "' + expectedType + '"; Actual Type: "' + error.name + '"');
    if (expectedMessage != null)
        console.log('Expected Message: "' + expectedMessage + '"; Actual Message: "' + error.message + '"');

    assert(error.name == expectedType,
        stringFormat('Unexpected error type. Expected type "{e}", actual type "{a}"', { e: expectedType, a: error.name }));
    if (expectedMessage != null) {
        assert(error.message == expectedMessage,
            stringFormat('Unexpected error message. Expected message "{e}", actual message "{a}"', { e: expectedMessage, a: error.message }));
    }
}


export class UnitTests {
    public tests: IUnitTest[] = null;

    constructor() {
        this.tests = [
            new UnitTest("Application No Message", () => {
                let e = ExceptionFactory.Application();
                assertError(e, "Application", "Error of type Application");
                assert(e.isApplicationException);

            }),
            new UnitTest("InvalidOperation No Message", () => {
                let e = ExceptionFactory.InvalidOperation();
                assertError(e, "InvalidOperation");
                assert(e.isInvalidOperationException);
            }),
            new UnitTest("InvalidOperation with Message", () => {
                assertError(ExceptionFactory.InvalidOperation("Test invalid op"), "InvalidOperation", "Test invalid op");
            }),
            new UnitTest("Argument No Message", () => {
                let e = ExceptionFactory.Argument("param1");
                assertError(e, "Argument", 'The argument "param1" is invalid.');
                assert(e.isArgumentException);
                assertEqual("param1", e.parameterName, "e.parameterName");

            }),
            new UnitTest("Argument with Message", () => {
                let e = ExceptionFactory.Argument("param1", "The {0} is required.", "foo");
                assertError(e, "Argument", 'The argument "param1" is invalid. The foo is required.');
                assert(e.isArgumentException);
                assertEqual("param1", e.parameterName, "e.parameterName");
            }),
            new UnitTest("ArgumentNull", () => {
                let e = ExceptionFactory.ArgumentNull("param1");
                assertError(e, "ArgumentNull", 'The argument "param1" cannot be null.');
                assert(e.isArgumentNullException);
                assertEqual("param1", e.parameterName, "e.parameterName");
            }),
            new UnitTest("ArgumentOutOfRange", () => {
                let e = ExceptionFactory.ArgumentOutOfRange("param1");
                assertError(e, "ArgumentOutOfRange", 'The value of the argument "param1" is outside of the allowable range.');
                assert(e.isArgumentOutOfRangeException);
                assertEqual("param1", e.parameterName, "e.parameterName");
            }),            
            new UnitTest("Custom with Format as ...args", () => {
                let e = ExceptionFactory.Custom("CustomError", "Your {0} doesn't work with my {1}", "foo", "bar");
                assertError(e, "CustomError", "Your foo doesn't work with my bar");
            }),
            new UnitTest("Custom with Format as [,]", () => {
                assertError(ExceptionFactory.Custom("CustomError", "Your {0} doesn't work with my {1}", ["foo", "bar"]), "CustomError", "Your foo doesn't work with my bar");
            }),
            new UnitTest("Custom with Format as {a,b}", () => {
                assertError(ExceptionFactory.Custom("CustomError", "Your {a} doesn't work with my {b}", { a: "foo", b: "bar" }), "CustomError", "Your foo doesn't work with my bar");
            }),
            new UnitTest("ApplicationException eval type", () => {
                try {
                    throw ExceptionFactory.Application();
                } catch (e) {
                    assert(e.isException, 'e.isException failed');
                    assert(e.isApplicationException), 'e.isApplicationException failed ';
                    assert(Exception.isExceptionOfType(e, "Application") === true, 'Exception.isExceptionOfType(e, "Application") === true failed ');
                    assert(!e.isIOException, '!e.isIOException failed');
                    assert(Exception.isErrorOfType(e, "IOException") === false, 'Exception.isErrorOfType(e, "IOException") === false failed ');
                    assert(Exception.isErrorOfType(e, "Application") === true, 'Exception.isErrorOfType(e, "Application") === true failed ');
                }
            }),
            new UnitTest("CustomException eval type", () => {
                try {
                    throw ExceptionFactory.Custom("FooBar");
                } catch (e) {
                    assert(e.isException, 'e.isException failed');
                    assert(e.isFooBarException, 'e.isFooBarException failed');
                    assert(Exception.isExceptionOfType(e, "FooBar") == true);
                    assert(Exception.isExceptionOfType(e, "Application") === false);
                    assert(!e.isApplicationException);
                    assert(Exception.isErrorOfType(e, "Application") === false);
                    assert(Exception.isErrorOfType(e, "FooBar") === true);
                }
            }),
            new UnitTest("IsErrorOfType test", () => {
                try {
                    throw new Error();
                } catch (e) {
                    assert(Exception.isError(e) === true, "Exception.isError(e) failed");
                    assert(Exception.isException(e) === false, "Exception.isException(e) failed");
                    assert(Exception.isErrorOfType(e, "Error") === true, "Exception.isErrorOfType(e, \"Error\") failed");
                }
            }),
            new UnitTest("Convert Native Error test", () => {
                try {
                    throw new RangeError();
                } catch (e) {
                    assert(Exception.isError(e) === true, "Exception.isError(e) === true failed");
                    assert(Exception.isException(e) === false, "Exception.isException(e) === false failed");
                    e = Exception.convert(e);
                    assert(Exception.isError(e) === true, "Exception.isError(e) === true (2) failed");
                    assert(Exception.isException(e) === true, "Exception.isException(e) === true failed");
                    assert(e.isRangeErrorException === true, "e.isRangeErrorException(e) === true failed");
                    assert(Exception.isErrorOfType(e, "RangeError") === true, "Exception.isErrorOfType(e, \"RangeError\") failed");
                }
            }),
            new UnitTest("Native Error toString test", () => {
                try {
                    throw new Error();
                } catch (e) {
                    e = Exception.convert(e);
                    assert(e.toString() == "Error", 'e.toString() == "Error" failed');
                }
            }),
            new UnitTest("Native Error toString test (with message)", () => {
                try {
                    throw new Error("Message");
                } catch (e) {
                    e = Exception.convert(e);
                    assert(e.toString() == "Error: Message", 'e.toString() == "Error: Message" failed');
                }
            }),
            new UnitTest("Exception toString test (with message)", () => {
                try {
                    throw ExceptionFactory.InvalidOperation("Message");
                } catch (e) {
                    assert(e.toString() == "InvalidOperation Error: Message", 'e.toString() == "InvalidOperation Error: Message" failed');
                }
            }),
        ];
    }

    executeAll() {
        let count = 0;
        let passed = 0;

        for (let test of this.tests) {
            test.execute();
            count++;
            if (test.passed)
                passed++;
        }

        console.log("Executed " + count + " tests: " + passed + " passed, " + (count - passed) + " failed.");
    }
}

