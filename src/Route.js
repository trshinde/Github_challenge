import React, { useState, useEffect } from "react";

const Route = () => {
  const [List, setList] = useState([]);
  const [ListStories, setListStories] = useState([]);

  const renderStories = React.useRef(()=>{});
  useEffect(() => {
    renderStories.current();
  }, []);

// First fetch()=> to get top 10 stories 
// Second fetch()=> to get the comments of those stories from kids property.
// Third fetch()=> to get title, comments and ID from the object obj.  





  renderStories.current = async () => {
    await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res);
        List.slice(0, 10) &&
          List.slice(0, 10).map((item) => {
            return fetch(
              `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
            )
              .then((res) => res.json())
              .then((res) => {
                const storyId = res.id;
                const storyTitle = res.title;
                const storyArrComments = [];
                if(res.kids && res.kids===undefined){return;}
                res.kids.map((item, index) => {
                  return fetch(
                    `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      storyArrComments.push(res.text);
                    });
                });
                const obj = {
                  title: storyTitle,
                  id: storyId,
                  comments: storyArrComments
                };
                setListStories((prevState) => [...prevState, obj]);
              });
          });
      });
  };



  return (
    <React.Fragment>
      <div>Top 10 stories: </div>
      <br />
      {Array.from(new Set(ListStories)) &&
        Array.from(new Set(ListStories)).map((item, index) => {
          return (
            <>
              <div key={index}>
                <hr/>
                <strong>Title of the story: </strong>
                <span><strong>{item.title}</strong></span><br/><br/>
              </div>
              <div>
                <ul>
                  {item.comments.map((comment, indx) => {
                    return (
                      <li
                        key={indx}
                        dangerouslySetInnerHTML={{ __html: comment }}
                      />
                    );
                  })}
                </ul>
              </div>
            </>
          );
        })}
    </React.Fragment>
  );
};

export default Route;
