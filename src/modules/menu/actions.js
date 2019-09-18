export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB';

export const RESET_PROPS = 'RESET_PROPS';

export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const setActiveTab = (name) => {
  return {type: SET_ACTIVE_TAB, activeTab: name}
};

export const resetProps = () => {
  return {type: RESET_PROPS}
};

