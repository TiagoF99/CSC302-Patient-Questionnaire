import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import QuestionnaireCard from '../questionnaireCard/questionnaireCard';
import questionnaireList from './questionnaireList.module.css';

const QuestionnaireList = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Fetch the first ten questionnaires
    const fetchQuestionnaires = async () => {
      const res = await axios
        .get(`/api/questionnairepage`)
        .then((res) => {
          const data = res.data.response;
          const questionnaireList = data.entry;
          if (data.link.length <= 2 && !hasNextURL(data.link)) {
            setHasMore(false);
          } else {
            const next = data.link[1].url; // URL to fetch the next 10 results
            setNextUrl(next);
          }

          setQuestionnaires(questionnaireList);
        })
        .catch((err) => {
          if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', err.message);
          }
        });
    };

    fetchQuestionnaires();
  }, []);

  const fetchNext = async () => {
    let data;
    const res = await axios
      .get(nextUrl)
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  // Check to see if we've reached the end of questionaire results
  const hasNextURL = (links) => {
    let hasNext = false;
    for (let i = 0; i < links.length; ++i) {
      if (links[i].relation == 'next') {
        hasNext = true;
        break;
      }
    }
    return hasNext;
  };

  const handleScroll = async () => {
    const data = await fetchNext();
    if (data !== null) {
      // fetchNext did not error out
      if (data.link.length <= 2 && !hasNextURL(data.link)) {
        setHasMore(false);
        return;
      }
      const next = data.link[1].url;
      setNextUrl(next);

      const nextQuestionnaires = data.entry;
      setQuestionnaires([...questionnaires, ...nextQuestionnaires]);
    }
  };

  // Route user to form page of the questionnaire they selected
  const handleCardClick = (id) => {
    history.push({
      pathname: `/form`,
      search: `?id=${id}`,
    });
  };

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
          return (
            <div onClick={() => handleCardClick(q.resource.id)}>
              <QuestionnaireCard
                title={res.title}
                desc={res.description}
                date={res.date}
                id={res.id}
                version={res.version}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default QuestionnaireList;
