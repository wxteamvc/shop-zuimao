import * as Types from '../actions/actionTypes';
const initialState = {
    keyWords: [],
    hasHistory: false
}
export function HistoryReducer(state = initialState, action) {
    switch (action.type) {
        case Types.SEARCH_HISTORY:
            for (var i = 0; i < state.keyWords.length; i++) {
                if (state.keyWords[i] == action.keyWord) {
                    state.keyWords.splice(i, 1);
                }
            }
            if (state.keyWords.length == 20) {
                state.keyWords.splice(19, 1);
            }
            return Object.assign({}, state, {
                keyWords: [
                    action.keyWord,
                    ...state.keyWords
                ],
                hasHistory: true
            });
        case Types.CLEAR:
            return Object.assign({}, state, {
                keyWords: action.keyWord,
                hasHistory: false
            });
        default:
            return state
    }
}