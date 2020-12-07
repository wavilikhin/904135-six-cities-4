import { reducer, ActionType } from './state';
import { StateStore } from '../../test/__mocks__/store';

describe(`State reducer test `, () => {
  it(`State reducer without additional params returns initnial state`, () => {
    expect(reducer(void 0, { type: `test` })).toEqual(StateStore);
  });

  it(`State reducer updates city correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.CHANGE_CITY,
        payload: 'Amsterdam',
      }),
    ).toEqual({
      city: 'Amsterdam',
      sortBy: 'popular',
    });
  });

  it(`State reducer updates sortBy correctly`, () => {
    expect(
      reducer(void 0, {
        type: ActionType.CHANGE_SORT_BY,
        payload: 'topRated',
      }),
    ).toEqual({
      city: ``,
      sortBy: 'topRated',
    });
  });
});
