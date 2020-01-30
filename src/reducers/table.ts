import { Reducer } from "redux";

export type TableState = {
  column?: string;
  sort?: "abc";
  reverse?: boolean;
};

const storageKey = "table_state";

const getTableFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(storageKey));
};
const setTableToLocalStorage = table => {
  return localStorage.setItem(storageKey, JSON.stringify(table));
};

const initialState: TableState = getTableFromLocalStorage() || {};

const table: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TABLE/SET":
      const table = { ...state, ...action.value };

      setTableToLocalStorage(table);

      return table;

    default:
      return state;
  }
};

export default table;
