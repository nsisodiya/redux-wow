import produce from "immer";
export function createActionsFromReducer(
  { namespace, actionMethods },
  dispatch
) {
  var temp = {};
  actionMethods.forEach(fname => {
    temp[fname] = (...args) => {
      console.log(args, ...args);
      dispatch({
        type: `[${namespace}] ${fname}`,
        payload: args
      });
    };
  });
  return temp;
}
export function createReducer(m) {
  const keysToBeRemoved = ["namespace", "init"];
  var reducer = function(prevState = m.initialState, action) {
    return produce(prevState, draftState => {
      var namespace = action.type.split(" ")[0];
      if (namespace === `[${m.namespace}]`) {
        var mName = action.type.split(" ")[1];
        if (typeof m[mName] === "function") {
          console.log("PayLoad", action.payload);
          return m[mName](draftState, ...action.payload);
        } else {
          return prevState;
        }
      } else {
        return prevState;
      }
    });
  };
  reducer.actionMethods = Object.keys(m).filter(
    key => keysToBeRemoved.indexOf(key) === -1 && typeof m[key] === "function"
  );
  reducer.namespace = m.namespace;
  return reducer;
}
