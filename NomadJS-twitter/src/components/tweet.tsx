import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255,255,255, 0.5);
    border-radius: 15px;
`;

const Column = styled.div`

`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0px;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");

    if (!ok || user?.uid !== userId) return;
    try {
      // 삭제를 위한 질의
      await deleteDoc(doc(db, "tweets", id));
      // 뿐만아니라 파일 스토리지에 저장된 이미지도 삭제
      // const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`);
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }

    } catch (error) {
      console.error(error);
    } finally {
      // 
    }
  }
  return (
    <Wrapper>
      <Column>
        <UserName>{username}</UserName>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? <DeleteButton onClick={onDelete}>Delete</DeleteButton> : null}
      </Column>
      <Column>
        {photo ? (
          <Photo src={photo} />
        ) : null}
      </Column>
    </Wrapper>
  );
}