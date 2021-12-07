import React, { useState } from 'react';
import '../tweet-card.css'

type Props = {
    item: any;
}

function nFormatter(num: any, digits: any) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

const Item = (props: any) => {
    const { profile_picture, user_name, user_screen_name, id_str, text, retweetCount, favCount, created_at, user_verified, handleOpenProfile, retweeted_status, quoted_status, retweeted_by } = props;
    return (
        <div className="item-card-wrapper">
            <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + user_screen_name + "/status/" + id_str)} >
                {
                    retweeted_status &&
                    <div className="d-flex ml-4 mt-1">
                        <div className="d-flex justify-content-center align-items-center innerIcon retweetedIcon">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                        </div>
                        <a href="#" className="text-decoration-none retweetedHeadingColor" onClick={() => handleOpenProfile("http://www.twitter.com/" + retweeted_by)} >
                            <small className="ml-1 font-weight-bold">{retweeted_by} Retweeted</small>
                        </a>
                    </div>
                }
                {
                    quoted_status &&
                    <>
                        {/* <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + quoted_status.user.screen_name + "/status/" + quoted_status.id_str)} >
                            <div>
                                quoted_status
                                text: {quoted_status.text}
                                name: {quoted_status.user.name}
                                <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + quoted_status.user.screen_name)} >
                                    screen name: @ {quoted_status.user.screen_name}
                                </a>
                            </div>
                        </a> */}
                        <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + quoted_status.user.screen_name + "/status/" + quoted_status.id_str)} >
                            <div className="card-body py-12px px-0 quoted_tweet">
                                <div className="d-flex">
                                    <div className="">
                                        <img className="user-img" src={quoted_status.user.profile_image_url_https} />
                                    </div>
                                    <div className="ml-2 w-100">
                                        <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + user_screen_name)} >
                                            <b>{quoted_status.user.name}</b>
                                        </a>
                                        {quoted_status.user.verified &&
                                            <svg viewBox="0 0 24 24" aria-label="Verified account" className="verifiedTick"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                                        }
                                        <span className="ml-1">
                                            <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + quoted_status.user.screen_name)} >
                                                @{quoted_status.user.screen_name}
                                            </a>
                                        </span>
                                        {/* <span>.</span> */}
                                        <span className="ml-1"> {quoted_status.created_at.slice(4, 10)}</span>
                                        <p className="mb-1">{quoted_status.text}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div className="card-body py-12px px-0 quoted_inner_tweet">
                            <div className="d-flex quoted_inner_tweet_border">
                                <div className="">
                                    <img className="user-img quoted_inner_image" src={profile_picture} />
                                </div>
                                <div className="ml-2 w-100">
                                    <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + user_screen_name)} >
                                        <b>{user_name}</b>
                                    </a>
                                    {user_verified &&
                                        <svg viewBox="0 0 24 24" aria-label="Verified account" className="verifiedTick"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                                    }
                                    <span className="ml-1">@{user_screen_name}</span>
                                    {/* <span>.</span> */}
                                    <span className="ml-1"> {created_at.slice(4, 10)}</span>
                                    <p className="mb-1">{text}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between tweetIcons mr-lg-5 pr-lg-5 mt-2">
                                <div className="d-inline-flex align-items-center replyIcon">
                                    <div className="d-flex justify-content-center align-items-center innerIcon">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className=""><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                                    </div>
                                    {/* <small className="ml-1">{replyCount}</small> */}
                                </div>
                                <div className="d-inline-flex align-items-center retweetIcon">
                                    <div className="d-flex justify-content-center align-items-center innerIcon">
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                                    </div>
                                    <small className="ml-1">{retweetCount}</small>
                                </div>
                                <div className="d-inline-flex align-items-center favIcon">
                                    <div className="d-flex justify-content-center align-items-center innerIcon">
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                    </div>
                                    <small className="ml-1">{favCount}</small>
                                </div>
                            </div>
                        </div>
                    </>
                    ||
                    <div className={retweeted_status && "card-body pt-0px px-0" || "card-body py-12px px-0"}>
                        <div className="d-flex">
                            <div className="">
                                <img className="user-img" src={profile_picture} />
                            </div>
                            <div className="ml-2 w-100">
                                <a href="#" className="text-decoration-none text-black" onClick={() => handleOpenProfile("http://www.twitter.com/" + user_screen_name)} >
                                    <b>{user_name}</b>
                                </a>
                                {user_verified &&
                                    <svg viewBox="0 0 24 24" aria-label="Verified account" className="verifiedTick"><g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path></g></svg>
                                }
                                <span className="ml-1">@{user_screen_name}</span>
                                {/* <span>.</span> */}
                                <span className="ml-1"> {created_at.slice(4, 10)}</span>
                                <p className="mb-1">{text}</p>
                                <div className="d-flex justify-content-between tweetIcons mr-lg-5 pr-lg-5">
                                    <div className="d-inline-flex align-items-center replyIcon">
                                        <div className="d-flex justify-content-center align-items-center innerIcon">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className=""><g><path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path></g></svg>
                                        </div>
                                        {/* <small className="ml-1">{replyCount}</small> */}
                                    </div>
                                    <div className="d-inline-flex align-items-center retweetIcon">
                                        <div className="d-flex justify-content-center align-items-center innerIcon">
                                            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                                        </div>
                                        <small className="ml-1">{retweetCount}</small>
                                    </div>
                                    <div className="d-inline-flex align-items-center favIcon">
                                        <div className="d-flex justify-content-center align-items-center innerIcon">
                                            <svg viewBox="0 0 24 24" aria-hidden="true"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                                        </div>
                                        <small className="ml-1">{favCount}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <span className="name text-black">{text}</span> */}
                    </div>
                }
            </a>
        </div>
    )

}

const ItemTweet: React.FunctionComponent<Props> = ({ item }) => {
    const { id, id_str, text, user, created_at, retweet_count, favorite_count, retweeted_status, quoted_status } = item
    // const [text, setText] = useState('');
    const handleOpenProfile = (url: string) => {
        window.open(url);
    }

    const favCount = nFormatter(retweeted_status ? retweeted_status.favorite_count : favorite_count, 1);
    const retweetCount = nFormatter(retweet_count, 1);
    const replyCount = nFormatter(user.statuses_count, 1);

    if (retweeted_status) {
        return (
            <Item
                profile_picture={retweeted_status.user.profile_image_url_https}
                user_name={retweeted_status.user.name}
                user_screen_name={retweeted_status.user.screen_name}
                id_str={retweeted_status.id_str}
                text={retweeted_status.text}
                retweetCount={retweetCount}
                favCount={favCount}
                created_at={created_at}
                handleOpenProfile={handleOpenProfile}
                retweeted_status={true}
                retweeted_by={user.screen_name}
            />
        )
    } else if (quoted_status) {
        return (
            <Item
                profile_picture={user.profile_image_url_https}
                user_name={user.name}
                user_screen_name={user.screen_name}
                id_str={id_str}
                text={text}
                retweetCount={retweetCount}
                favCount={favCount}
                created_at={created_at}
                handleOpenProfile={handleOpenProfile}
                retweeted_status={false}
                quoted_status={quoted_status}
            />
        )
    } else {
        return (
            <Item
                profile_picture={user.profile_image_url_https}
                user_name={user.name}
                user_screen_name={user.screen_name}
                id_str={id_str}
                text={text}
                retweetCount={retweetCount}
                favCount={favCount}
                created_at={created_at}
                handleOpenProfile={handleOpenProfile}
                retweeted_status={false}
            />
        )
    }

}

export default ItemTweet;