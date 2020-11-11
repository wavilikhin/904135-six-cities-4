import { reducer, ActionType } from './state.js';

describe(`State reducer test `, () => {
  it(`State reducer without additional params returns initnial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      city: '',
    });
  });

  it(`State reducer updates city correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.CHANGE_CITY,
        payload: 'Amsterdam',
      }),
    ).toEqual({
      city: 'Amsterdam',
    });
  });
});
