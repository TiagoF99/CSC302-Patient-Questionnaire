import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import questionnaireList from './questionnaireList.module.css';


const QuestionnaireList = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {

    // Fetch the first ten questionnaires
    const fetchQuestionnaires = async () => {
      const res = await axios.get(`/api/questionnairepage`);
      const data = res.data.response;
      const questionnaireList = data.entry;
      const next = data.link[1].url; // URL to fetch the next 10 results

      setQuestionnaires(questionnaireList);
      setNextUrl(next)
    };

    fetchQuestionnaires();
  }, []);

  const fetchNext = async () => {
    const res = await axios.get(nextUrl);
    // console.log(res)
    // const questionnaireList = res.data.entry;
    // const next = res.data.link[1].url;

    // setNextUrl(next)
    
    return res.data;
  };

  // Check to see if we've reached the end of questionaire results
  const hasNextURL = (links) => {
    var hasNext = false;
    for (let i = 0; i < links.length; ++i) {
      if (links[i].relation == 'next') {
        hasNext = true;
        break;
      }
  }
    return hasNext;
  }

  const handleScroll = async () => {
    const data = await fetchNext();
    if (data.link.length <= 2 && !hasNextURL(data.link)) {
      setHasMore(false)
      return;
    }
    const next = data.link[1].url;
    setNextUrl(next)
    
    const nextQuestionnaires = data.entry;
    setQuestionnaires([...questionnaires, ...nextQuestionnaires]);
  };

  return (
    <div className={questionnaireList}>
      list
      <InfiniteScroll
        dataLength={questionnaires.length}
        next={handleScroll}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>All questionnaires loaded.</h4>}
      >   
        {questionnaires.map((q) => {
            return <h4>{q.resource.id} {q.resource.title}</h4>;
            // if title use title, if no title, use name
          })}

      </InfiniteScroll>
    </div>
  );
};

export default QuestionnaireList;
