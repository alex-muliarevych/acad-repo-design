import testControllerHolder from '../../../decorators/testControllerHolder';

fixture('fixture')
test('test', testControllerHolder.capture);
