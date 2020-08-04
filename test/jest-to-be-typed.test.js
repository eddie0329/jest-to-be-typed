import toBeTyped from '../index';

expect.extend(toBeTyped);

describe('testing extended expect', () => {
  it('tests normal types correctly', () => {
    expect('').toBeTyped('string');
    expect({}).toBeTyped('object');
    expect(1).toBeTyped('number');
    expect(false).toBeTyped('boolean');
    expect(Symbol('foobar')).toBeTyped('symbol');
    expect(() => {}).toBeTyped('function');
  });
  it('tests other types correctly', () => {
    expect([]).toBeTyped('array');
    expect(/foobar/).toBeTyped('regexp');
    expect(new RegExp('foobar')).toBeTyped('regexp');
    expect(null).toBeTyped('null');
    expect(undefined).toBeTyped('undefined');
    expect(new Map()).toBeTyped('map');
    expect(new Set()).toBeTyped('set');
    expect(new Date()).toBeTyped('date');
  });
  it('works with promises', () => {
    return expect(Promise.resolve([])).resolves.toBeTyped('array');
  });
});

describe('advanced test', () => {
  it('string number test', () => {
    const data = {
      name: 'eddie',
      age: 13,
      address: [],
      isMarried: false,
    };
    const types = {
      name: 'string',
      age: 'number',
      address: 'array',
      isMarried: 'boolean',
    };
    expect(data).toBeTyped(types);
  });

  // below should be wrong test

  // it('wrong test', () => {
  //   const data = {
  //     name: 'eddie',
  //     age: 13,
  //   };
  //   const typed = {
  //     name: 'number',
  //     age: 'number',
  //   };
  //   expect(data).toBeTyped(typed);
  // });
  // it('length not equal test', () => {
  //   const data = {
  //     name: 'eddie',
  //   };
  //   const types = {
  //     name: 'string',
  //     age: 'number',
  //   };
  //   expect(data).toBeTyped(types);
  // });
});
