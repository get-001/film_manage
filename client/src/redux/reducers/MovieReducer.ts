import { IMovie } from "../../services/MovieService";
import { ISearchCondition } from "../../services/CommonTypes";
import {
  MovieActions,
  SaveMoviesAction,
  SetConditionAction,
  SetLoadingAction,
  DeleteAction
} from "../actions/MovieAction";
import { Reducer } from "react";

export type IMovieCondition = Required<ISearchCondition>; // 将原本为可选的类型全部变成必填

/**
 * 描述电影列表的状态类型
 * @export
 * @interface IMovieState
 */
export interface IMovieState {
  /*      data -- 电影数组 */
  data: IMovie[];
  /* condition -- 查询条件 */
  condition: IMovieCondition;
  /*     total -- 总记录数 */
  total: number;
  /* isLoading -- 正在加载 */
  isLoading: boolean;
}

const defaultState: IMovieState = {
  data: [],
  condition: {
    page: 1,
    limit: 10,
    key: ""
  },
  total: 0,
  isLoading: false
};

type MovieReducer<A> = Reducer<IMovieState, A>;
const saveMovie: MovieReducer<SaveMoviesAction> = function(state, action) {
  return {
    ...state,
    data: action.payload.movies,
    total: action.payload.total
  };
};
const setCondition: MovieReducer<SetConditionAction> = function(state, action) {
  return {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload
    }
  };
};
const setLoading: MovieReducer<SetLoadingAction> = function(state, action) {
  return {
    ...state,
    isLoading: action.payload
  };
};
const deleteMovie: MovieReducer<DeleteAction> = function(state, action) {
  return {
    ...state,
    data: state.data.filter(m => m._id !== action.payload),
    total: state.total - 1
  };
};

export default function(
  state: IMovieState = defaultState,
  action: MovieActions
) {
  // 可辨识联合
  switch (action.type) {
    case "movie_delete":
      return deleteMovie(state, action);
    case "movie_save":
      return saveMovie(state, action); // 保存电影
    case "movie_setCondition":
      return setCondition(state, action);
    case "movie_setLoading":
      return setLoading(state, action);
    default:
      return state;
  }
}
