import { ExceptionFactory } from './package-src/index';
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
        try {
            this.fn();
            this._passed = true;
        }
        catch (e) {
            this._passed = false;
            this._error = e;
        };

        console.log("Passed: " + this._passed);
        this._executed = true;
    }
}

const assert = (condition, message?: string) => {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
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

    static createTests(): IUnitTest[] {
        return [
            new UnitTest("Application No Message", () => {
                assertError(ExceptionFactory.Application(), "Application", "Error of type Application");
            }),
            new UnitTest("InvalidOperation No Message", () => {
                assertError(ExceptionFactory.InvalidOperation(), "InvalidOperation");
            }),
            new UnitTest("InvalidOperation with Message", () => {
                assertError(ExceptionFactory.InvalidOperation("Test invalid op"), "InvalidOperation", "Test invalid op");
            }),
            new UnitTest("Custom with Format as ...args", () => {
                assertError(ExceptionFactory.Custom("CustomError", "Your {0} doesn't work with my {1}", "foo", "bar"), "CustomError", "Your foo doesn't work with my bar");
            }),
            new UnitTest("Custom with Format as [,]", () => {
                assertError(ExceptionFactory.Custom("CustomError", "Your {0} doesn't work with my {1}", ["foo", "bar"]), "CustomError", "Your foo doesn't work with my bar");
            }),
            new UnitTest("Custom with Format as {a,b}", () => {
                assertError(ExceptionFactory.Custom("CustomError", "Your {a} doesn't work with my {b}", { a: "foo", b: "bar" }), "CustomError", "Your foo doesn't work with my bar");
            })
        ];
    }
}