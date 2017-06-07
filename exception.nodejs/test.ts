import { UnitTests } from './unit-tests';

var unitTests = UnitTests.createTests();

for (let test of unitTests) {
    test.execute();
}
