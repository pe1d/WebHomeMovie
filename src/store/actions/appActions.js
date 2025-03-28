import actionTypes from './actionTypes';

export const appStartUpComplete = () => ({
    type: actionTypes.APP_START_UP_COMPLETE
});
export const changeLanguageApp = (language) => ({
    type: actionTypes.CHANGE_LANGUAGE,
    language: language,
})
export const setSideInfo = (side) => ({
    type: actionTypes.SET_SIDE,
    side: side,
})
export const setSubActive = (activeSubMenu) => ({
    type: actionTypes.SET_MENU,
    activeSubMenu: activeSubMenu
})