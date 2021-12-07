export const fetchSearchText = async (searchText: string,queryText:any) => {
    // const endpoint = `https://api.github.com/search/users?q=${searchText}`;
    let query = " "
    if(queryText)
    {
        query = queryText;
        console.log("queryText",queryText)
    }
    else{
        query = `?q=${searchText}`;
    }
    const endpoint = `https://twitter-search-dev-backend.herokuapp.com/search${query}`;
    const data = await (await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
        }
    })).json();
    console.log("data", data)
    return data;
}
