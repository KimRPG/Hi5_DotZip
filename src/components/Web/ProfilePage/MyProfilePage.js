import styled from "styled-components";
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoShareButton from '../ProfilePage/ShareKakao';
import ImageSaveButton from '../ProfilePage/SaveImage';
import { collection, query, orderBy, limit, getDocs, updateDoc , doc} from "firebase/firestore";
import { dbService } from "../../../fbase.js";
import { UserNameContext } from '../../../UserNameContext';

const Div = styled.div`

`;
//랭킹 top3 키워드
const VoteKewordBox = styled.div`
    white-space: pre-line;
    width: 200px;
    height: 100px;
    margin: 5px;
    border: 1px solid black;
    background: skyblue;
    color: #ffffff;
`;
//버튼들
const SaveButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const CreateZipButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const BackHomeButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
//-------------------------------------------------------------------------
const MyProfilePage = () => {
    const userId = localStorage.getItem("kakaoId");
    const [userNickname, setUserName] = useState(localStorage.getItem("userName"));
    useEffect(() => {
      localStorage.setItem('userName', userNickname);
      updateFirestoreUserName(userNickname);
      console.log(localStorage.getItem("userName"));
    }, [userNickname]);
    
    const updateFirestoreUserName = async (newUserName) => {
      try {
        const docRef = doc(dbService, 'kakaoId', userId);
        await updateDoc(docRef, {
          userName: newUserName
        });
        console.log('Firestore userName updated:', newUserName);
      } catch (error) {
        console.error('Error updating Firestore userName:', error);
      }
    };

  const handleButtonClick = () => {
    const newUserName = prompt('Enter your new name:');
    if (newUserName) {
      setUserName(newUserName);
    }
  };


    // 홈으로 돌아가기
    const navigate = useNavigate();
    const handleBackHome = () => {
      navigate('/Home');
    };
    const road = collection(dbService, 'zip_Answer');
    const [top3Answer, setTop3Answer] = useState([]);
  
    useEffect(() => {
      const fetchDocuments = async () => {
        const q = query(road, orderBy('totalVote', 'desc'), limit(3));
        try {
          const querySnapshot = await getDocs(q);
          const topThreeDocuments = [];
  
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const document = {
              answer: data.answer,
              voteData: data.totalVote,
              ID: data.answerId,
            };
            topThreeDocuments.push(document);
          });
          setTop3Answer(topThreeDocuments);
          console.log(topThreeDocuments);
          // 여기서 상태(state)로 할당하거나 렌더링할 수 있습니다.
        } catch (error) {
          console.error('Error getting documents:', error);
        }
      };
  
      fetchDocuments();
    }, []);
  

    return(
        <Div>
            <h1><button onClick={handleButtonClick}>{userNickname}</button>님의 .ZiP</h1>
            {/* 사용자 id받아와서 넣어 줄 부분 */}
            <h2>나의 ZiP 랭킹</h2>
            {top3Answer.map(({ answer, voteData, ID }, index) => (
            <VoteKewordBox key={ID}>{`${index + 1}위 ${answer}\n 투표수 : ${voteData}`}</VoteKewordBox>
          ))}
            <KakaoShareButton/>
            <ImageSaveButton/>
            <CreateZipButton>다른 .ZiP 만들기</CreateZipButton>
            <BackHomeButton onClick={handleBackHome}>홈으로 돌아가기</BackHomeButton>
        </Div>
    );
};

export default MyProfilePage;