const identity = (state, payload) => payload;

const createReducer = (...actionHandlers) => (defaultValue = null) => {
    const actions = actionHandlers.reduce(
        (acc, actionSpec) => {
            actionSpec = [].concat(actionSpec);
            const last = actionSpec.slice(-1)[0];
            const actionReducer = typeof last === 'function' ? last : identity;
            const actionTypes = actionReducer === identity ? actionSpec : actionSpec.slice(0, -1);

            actionTypes.forEach(actionType => acc[actionType] = actionReducer);
            return acc;
        },
        {}
    );

    return (state, { type, payload, error }) => {
        if (actions[type]) {
            return actions[type](state, payload, error);
        }

        return typeof state === 'undefined' ? defaultValue : state;
    };
};

export default createReducer;
