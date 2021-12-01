import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import QuestionnaireCard from '../questionnaireCard/questionnaireCard';
import InfiniteScroll from "react-infinite-scroll-component";
import questionnaireList from './questionnaireList.module.css';


const QuestionnaireList = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

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

  // Route user to form page of the questionnaire they selected
  const handleCardClick = (id) => {
    history.push({
      pathname: `/form`,
      search: `?id=${id}`,
    });
  }

  return (
    <div className={questionnaireList}>
      <InfiniteScroll
        dataLength={questionnaires.length}
        next={handleScroll}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>All questionnaires loaded.</h4>}
      >   
        {questionnaires.map((q) => {
          const res = q.resource;
            return (<div onClick={() => handleCardClick(q.resource.id)}>
                      <QuestionnaireCard 
                      title={res.title}
                      desc={res.description}
                      date={res.date}
                      id={res.id}
                    />
            </div>)})}

      </InfiniteScroll>
    </div>
  );
};

export default QuestionnaireList;
