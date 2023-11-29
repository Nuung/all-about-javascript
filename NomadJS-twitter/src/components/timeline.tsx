import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore"; // getDocs 여기서 가져옴
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/database";

// 트윗 데이터의 필드 정의, 타입 정의하기
export interface ITweet {
  id: string;
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  // 개발 모드에서는 `useEffect` 를 2번 호출한다는 점!
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        // 이러면 모든 데이터를 가져오기 때문에 페이지네이션이 좋음 - limit 사용
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(50)
      );

      // 기본 모든 데이터 가져오기 
      // const spanshot = await getDocs(tweetsQuery);
      // const tweets = spanshot.docs.map((doc) => {
      //   const { photo, tweet, userId, username, createAt } = doc.data();
      //   return {
      //     id: doc.id,
      //     photo, tweet, userId, username, createAt,
      //   }
      // });

      // 위 action 대신 삭제 or 편집 or 생성 등의 이벤트 기반 realtime 으로 질의하기
      // Attaches a listener for DocumentSnapshot events
      // 구독 취소를 위해 해당 instacne 저장
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { photo, tweet, userId, username, createAt } = doc.data();
          return {
            id: doc.id,
            photo, tweet, userId, username, createAt,
          }
        });
        setTweet(tweets);
      });
    };

    fetchTweets();
    // uesEffect 에서 tear down & clean up 
    // 화면을 안볼때 -> unmount 할때 -> 더 이상 해당 이벤트를 구독하지 않게 세팅
    return () => { unsubscribe && unsubscribe(); }
  });

  return (
    <Wrapper>
      {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
    </Wrapper>
  );
}