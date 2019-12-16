import React, { useEffect, useReducer } from 'react';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

// 初期状態
const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};


const App = () => {
  //  const [loading, setLoading] = useState(true);
  //  const [movies, setMovies] = useState([]);
  //  const [errorMessage, setErrorMessage] = useState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  // 初期描画
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        })
        //    setMovies(jsonResponse.Search);
        //    setLoading(false);

      });
  }, []);

  // 検索実行関数
  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    })
    //    setLoading(true);
    //    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          })

          //          setMovies(jsonResponse.Search);
          //          setLoading(false);
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
          //          setErrorMessage(jsonResponse.Error);
          //          setLoading(false);
        }
      });
  };

  const { movies, errorMessage, loading } = state;


  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">

        {
        // if else in JSX.
        (() => {
          if (loading && !errorMessage) {
            return <span> loading ...</span>
          } else if (errorMessage) {
            return <div className="errorMessage">{errorMessage}</div>

          } else {
            return movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))

          }
        })()
        }

        {
        // 3項演算子
        /*
        loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))
            )
            */
        }

      </div>
    </div>
  );
};


export default App;
