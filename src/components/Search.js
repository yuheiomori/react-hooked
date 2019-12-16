import React, { useState } from "react";

const Search = (props) => {
    const [searchValue, setSearchValue] = useState("");

    // 入力するたびに、stateのsearchValueに値をセットする
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    };

    // 検索実行。親から渡された(props)searchを呼ぶ
    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        setSearchValue("");
    };


    return (
        <form className="search">
            <input value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"></input>
            <input onClick={callSearchFunction} type="submit" value="SEARCH"></input>

        </form>
    )


};

export default Search;