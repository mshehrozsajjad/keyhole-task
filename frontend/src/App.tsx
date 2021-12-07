import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchSearchText } from './API';
import InputText from './components/InputText';
import ItemCard from './components/ItemCard';
import ItemTweet from './components/ItemTweet';
import * as images from './helper/images';

function App() {
  const [searchedData, setSearchedData] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [fetchedRecords, setFetchedRecords] = useState(0)
  const [inputTextFocus, setInputTextFocus] = useState(false)
  const [hintText, setHintText] = useState('')
  const [paddingLeft, setPaddingLeft] = useState(0);

  //function for debounce input text to call api after user stop typing
  const debounce = (func: any, wait: any, immediate: any) => {
    var timeout: any;
    return function () {
      setHintText("");
      var context = arguments;
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  const updateText: UpdateText = debounce(async (text: string) => {
    let count = 0;
    let data = []
    setIsLoading(true);
    const search = await fetchSearchText(text,null);
    console.log("search",search)
    //setSearchedData(search.statuses ? search.statuses : []);
    data = search.statuses ? search.statuses : [];
    let fetchLength = search.statuses.length
    setFetchedRecords(fetchLength)
    let next = search.search_metadata.next_results;
    while(count <10)
    {
        let temp = await fetchSearchText(text,next)
        // setSearchedData([...searchedData,...temp.statuses]);
        fetchLength = fetchLength+temp.statuses.length
        setFetchedRecords(fetchLength)
        data = [...data,...temp.statuses];
        next = temp.search_metadata.next_results;
        count = count +1;
        console.log("count",count);
    }
    data.map((val:any)=>{
      val.sum_replise_retweet = val.retweeted_status?val.retweeted_status.favorite_count:val.favorite_count + val.retweet_count;
    })
    data = data.sort((a:any, b:any) => (a.sum_replise_retweet > b.sum_replise_retweet ? -1 : 1));
    console.log("data with sum",data);
    setSearchedData(data);

    // if (search) {
      // if(search[0].login.includes(text))
      // {
      //   setHintText(search[0].login.replace(text,""))
      //   setPaddingLeft(text.length*7.5)
      // }
    // }
    setIsLoading(false);
    setFetchedRecords(0);
  }, 1000, false);

  const updateFocus: UpdateFocus = async (val: boolean) => {
    setInputTextFocus(val);
  };

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setInputTextFocus(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="App">
      <div className="container container-style col-lg-5">
        <div className="align-items-center justify-content-center row mt-2">
          <div className="align-items-center d-flex justify-content-center">
            <img className="twitter-logo" src={images.twitter} />
            <h1 className="title">Search</h1>
          </div>
        </div>
        {/* <div className="tagline">
          a flexible JavaScript library that provides a strong foundation for building robust typeaheads
        </div> */}

        <div className="mt-1">
          <div className="position-relative card-form ">
            <InputText updateText={updateText} isLoading={isLoading} updateFocus={updateFocus} />
            {inputTextFocus &&
              <input
                style={{ paddingLeft: paddingLeft }}
                className="hint-text text-color"
                type="text"
                value={hintText}
                disabled
              ></input>}
            {/* {(searchedData.length > 0 && inputTextFocus) &&
              <div ref={wrapperRef} className="item-card">
                {searchedData.map((val: SearchResult) => (
                  <ItemCard key={val.id} item={val} />
                ))}
              </div>
            } */}
            {(searchedData.length > 0 && !isLoading) &&
              <div>
                {searchedData.map((val: any) => (
                  <ItemTweet key={val.id} item={val} />
                ))}
              </div>
            }
            {isLoading &&
              <b>
              {fetchedRecords} out of 1000
              </b>
            }
            {/* <div className="links">
              <a href="#" className="links text-decoration-none">
                or see examples
              </a>
            </div> */}
          </div>
        </div>
        {/* <div>
          <div>
            <a className="btn-download text-decoration-none" href="#"><strong>download</strong> v0.0.1</a>
          </div>
          <div className="links mt-4">
            project & docs on GitHub · changelog
          </div>
        </div>
        <div className="d-block justify-content-around row mt-5">
          <span className="links">follow</span>
          <span className="links">follow</span>
          <span className="links">follow</span>
          <span className="links">follow</span>
        </div> */}
      </div>
    </div>
  );
}

export default App;
