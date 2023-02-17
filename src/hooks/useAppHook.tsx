import { useCallback, useContext } from "react";
import { getCharactersData, getPlanetsData } from "../api/data";
import { ActionTypes, AppActions } from "../store/actions/actions";
import AppContext from "../store/contexts/app.context";

const useAppHook = () => {
  const { state, dispatch } = useContext(AppContext);
  const { currentPageCharacters, currentPagePlanets } = state;

  const getPlanetsList = useCallback(async () => {
    const planetsData = await getPlanetsData(currentPagePlanets);
    const initializePlanetsAction: AppActions = {
      type: ActionTypes.GET_PLANETS,
      payload: planetsData,
    };
    dispatch(initializePlanetsAction);
  }, [dispatch, currentPagePlanets]);

  const getCharactersList = useCallback(async () => {
    const charactersData = await getCharactersData(currentPageCharacters);
    const initializeCharactersAction: AppActions = {
      type: ActionTypes.GET_CHARACTERS,
      payload: charactersData,
    };
    dispatch(initializeCharactersAction);
  }, [dispatch, currentPageCharacters]);

  const planetsPagination = async (direction: "next" | "prev") => {
    const getNextPlanets: AppActions = {
      type: ActionTypes.NEXT_PAGE_PLANETS,
      payload: 7,
    };
    const getPrevPlanets: AppActions = {
      type: ActionTypes.PREV_PAGE_PLANETS,
    };
    direction === "next" ? dispatch(getNextPlanets) : dispatch(getPrevPlanets);
  };

  const charactersPagination = async (direction: "next" | "prev") => {
    const getNextCharacters: AppActions = {
      type: ActionTypes.NEXT_PAGE_CHARACTERS,
      payload: 42,
    };
    const getPrevCharacters: AppActions = {
      type: ActionTypes.PREV_PAGE_CHARACTERS,
    };
    direction === "next"
      ? dispatch(getNextCharacters)
      : dispatch(getPrevCharacters);
  };

  const getCharacterDetails = async (id: number) => {};

  return {
    state,
    getPlanetsList,
    getCharactersList,
    planetsPagination,
    charactersPagination,
    getCharacterDetails,
  };
};

export default useAppHook;
