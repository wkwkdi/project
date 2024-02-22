import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  exists,
  where,
  arrayUnion,
  arrayRemove,
  increment,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  // 아래 안되면 위에거로
  // apiKey: "AIzaSyDVWZ9ODiEMQRN8FWOBV8vHR2lqmX2p6kI",
  // authDomain: "buddiz-72571.firebaseapp.com",
  // projectId: "buddiz-72571",
  // storageBucket: "buddiz-72571.appspot.com",
  // messagingSenderId: "143210608224",
  // appId: "1:143210608224:web:2f9e32fa243cbfa2d47505",
  // 위에 안되면 이거로 다시
  apiKey: "AIzaSyCJDkOrv7ZDSkqxHXknfxRf7G14LYnaizM",
  authDomain: "buddiz2.firebaseapp.com",
  projectId: "buddiz2",
  storageBucket: "buddiz2.appspot.com",
  messagingSenderId: "1011707955672",
  appId: "1:1011707955672:web:c4fa09880e47738cc10aad",
};
const { v4: uuidv4 } = require("uuid");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 최종프로젝트 아래사용 파이어베이스 --------------------------------------------------------------------------------------

// 데이터 가져오는 함수
async function getAddress(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const result = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return result;
}

// 관리자 데이터 가져오는 함수
async function getManager(collectionName) {
  const docRef = doc(db, collectionName, "66c8WvyDzH9M35fb1KTK");
  const docSnapshot = await getDoc(docRef);
  console.log(docRef);
  console.log(docSnapshot);

  if (docSnapshot.exists) {
    const review = { docId: docSnapshot.id, ...docSnapshot.data() };
    console.log(review);
    return { review };
  }
}

// 데이터 수정하는 함수 / 추천, 비추천
async function updateData(collectionName, docId, formData) {
  console.log(docId, formData);
  const docRef = doc(db, collectionName, docId);
  const update = await updateDoc(docRef, formData);

  console.log(update);
  return update;
}

// 비밀번호 변경할때 비밀번호 체크
async function pwCheckUpdate(collectionName, changePw) {
  const data = query(
    collection(db, collectionName).where("MEM_PASSWORD", "==", changePw)
  );
  const querySnapshot = await getDocs(data);
  if (querySnapshot.exists()) {
    const reviews = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    return reviews;
  }
}

// 이메일 찾기
async function findEmail(collectionName, find1, find2) {
  const docQuery = query(
    collection(db, collectionName),
    where("MEM_NAME", "==", find1),
    where("MEM_PHONE", "==", find2)
  );
  const querySnapshot = await getDocs(docQuery);
  if (!querySnapshot.empty) {
    const review = {
      docId: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
    return review;
  }
}

// 비밀번호 찾기
async function findPassword(collectionName, find1, find2, find3) {
  const docQuery = query(
    collection(db, collectionName),
    where("MEM", "==", find1),
    where("MEM_NAME", "==", find2),
    where("MEM_PHONE", "==", find3)
  );
  const querySnapshot = await getDocs(docQuery);
  if (!querySnapshot.empty) {
    const review = {
      docId: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data(),
    };
    return review;
  }
}

// 데이터 추가하고 가져오는 함수 / 신고
async function addData(collectionName, formData) {
  const result = await addDoc(collection(db, collectionName), formData);
  const docSnap = await getDoc(result);
  if (docSnap.exists()) {
    const review = { docId: docSnap.id, ...docSnap.data() };
    return { review };
  }
}

// 채팅방 생성 함수
async function addChatRoom(collectionName, data1, data2, data3) {
  const uuid = uuidv4(); // uuidv4 함수를 사용하여 UUID 생성
  const ref = collection(db, collectionName);
  const result = await addDoc(ref, {
    DOCID: uuid,
    docId: [data1, data2],
    TITLE: data3,
  });

  const docSnap = await getDoc(result);
  if (docSnap.exists()) {
    const review = { doc: docSnap.id, ...docSnap.data() };
    return review;
  }
}

// // 데이터 문서 id 이름 정해서 넣기
async function addSetData(collectionName, docId, formData) {
  console.log(collectionName, docId, formData);
  const result = await setDoc(doc(db, collectionName, docId), formData);
  // const docSnap = await getDoc(result);
  // if (docSnap.exists()) {
  //   const review = { docId: docSnap.id, ...docSnap.data() };
  //   return { review };
  // }
}

async function nicknameComparison(collectionName, nickname, phone) {
  let docQuery;

  if (nickname) {
    docQuery = query(
      collection(db, collectionName),
      where("MEM_NICKNAME", "==", nickname)
    );
  } else {
    docQuery = query(
      collection(db, collectionName),
      where("MEM_PHONE", "==", phone)
    );
  }
  const querySnapshot = await getDocs(docQuery);
  const result = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return result;
}

// 메인페이지 조회수가 가장많은 게시글 5개 가져오기
async function getMainBoardData(collectionName) {
  const docQuery = query(
    collection(db, collectionName),
    orderBy("BOARD_VIEW", "desc"),
    limit(8)
  );
  const querySnapshot = await getDocs(docQuery);
  const result = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return result;
}

// 게시판 nav바 메뉴 눌렀을때 데이터 가져오는 함수
async function getBoardData(collectionName, number, count) {
  if (number == "000") {
    const docQuery = query(
      collection(db, collectionName),
      orderBy(count, "desc")
    );
    const querySnapshot = await getDocs(docQuery);
    const result = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    return result;
  } else {
    const docQuery = query(
      collection(db, collectionName),
      where("BOARD_CODE", "==", number),
      orderBy(count, "desc")
    );
    const querySnapshot = await getDocs(docQuery);
    const result = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    return result;
  }
}

// 게시판 리스트 한개 눌렀을때 가져오는 함수
async function getBoardContentData(collection, docId) {
  try {
    const item = doc(db, collection, String(docId));
    const data = await getDoc(item);
    // Check if the document exists
    if (data.exists()) {
      return { docId: data.id, ...data.data() };
    } else {
      console.error("Document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error for further handling, if needed
  }
}

// Board 컬렉션에 review 배열에 값 추가
async function addReview(collectionName, docId, newReview, name) {
  const uuid = uuidv4(); // uuidv4 함수를 사용하여 UUID 생성
  const docRef = doc(db, collectionName, docId);
  try {
    // Board 문서 업데이트
    await updateDoc(docRef, {
      BOARD_REVIEW: arrayUnion({
        REVIEW_ID: uuid,
        REVIEW_CONTENT: newReview,
        REVIEW_USERNAME: name,
        REVIEW_REPLY: [], // 초기에 댓글의 대댓글은 빈 배열로 시작
      }),
    });
    console.log("Review added to Board:", newReview);
  } catch (error) {
    console.error("Error adding review:", error);
  }
}

// Board 컬렉션에 대댓글 추가
async function addReply(collectionName, docId, reviewId, newReply, name) {
  const id = uuidv4(); // uuidv4 함수를 사용하여 UUID 생성
  try {
    const docRef = doc(db, collectionName, docId);
    // 해당 리뷰 객체가 있는지 확인
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const boardReview = docSnapshot.data().BOARD_REVIEW;

      const updatedBoardReview = boardReview.map((review) => {
        if (review.REVIEW_ID === reviewId) {
          // REVIEW_REPLY 필드를 배열로 초기화
          review.REVIEW_REPLY = review.REVIEW_REPLY || [];

          // REVIEW_REPLY 필드에 새로운 대댓글 추가
          review.REVIEW_REPLY.push({
            REPLY_USERNAME: name,
            REPLY_CONTENT: newReply,
            REPLY_ID: id,
          });

          return review;
        }
        return review;
      });

      // 해당 리뷰의 BOARD_REVIEW 필드 업데이트
      const arrayUpdate = await updateDoc(docRef, {
        BOARD_REVIEW: updatedBoardReview,
      });
    } else {
      console.error("Review does not exist");
    }
  } catch (error) {
    console.error("Error adding reply:", error);
  }
}

// 댓글 수정
async function updateReview(collectionName, docId, reviewId, data) {
  const docRef = doc(db, collectionName, docId);
  // 해당 보드 문서 가져오기
  const Snapshot = await getDoc(docRef);
  if (Snapshot.exists()) {
    // BOARD_REVIEW 배열 가져오기
    const boardReviewArray = Snapshot.data().BOARD_REVIEW || [];

    // 댓글 업데이트
    const updateData = boardReviewArray.map((comment) => {
      if (comment.REVIEW_ID === reviewId) {
        return { ...comment, REVIEW_CONTENT: data };
      }
      return comment;
    });
    // 보드 문서 업데이트
    await updateDoc(docRef, {
      BOARD_REVIEW: updateData,
    });
  }
}

// 댓글 삭제
async function deleteReview(collectionName, docId, reviewId) {
  const docRef = doc(db, collectionName, docId);

  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const boardReviewArray = docSnapshot.data().BOARD_REVIEW || [];

      // REVIEW_ID가 reviewId와 일치하지 않는 객체들로 이루어진 새로운 배열 생성
      const updatedBoardReviewArray = boardReviewArray.filter(
        (review) => review.REVIEW_ID !== reviewId
      );

      // 보드 문서 업데이트
      await updateDoc(docRef, {
        BOARD_REVIEW: updatedBoardReviewArray,
      });

      return true;
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    return false;
  }
}

// 대댓글(REVIEW_REPLY) 수정
async function updateReply(collectionName, docId, reviewId, replyId, data) {
  const docRef = doc(db, collectionName, docId);
  const Snapshot = await getDoc(docRef);

  if (Snapshot.exists()) {
    const boardReviewArray = Snapshot.data().BOARD_REVIEW || [];

    // 댓글(REVIEW) 배열 수정
    const updatedReviewArray = boardReviewArray.map((review) => {
      if (review.REVIEW_ID === reviewId) {
        // REVIEW_REPLY 배열 수정
        const updatedReplyArray = review.REVIEW_REPLY.map((reply) => {
          if (reply.REPLY_ID === replyId) {
            // 원하는 조건으로 수정
            return { ...reply, REPLY_CONTENT: data };
          }
          return reply;
        });

        // 해당 REVIEW 수정
        return { ...review, REVIEW_REPLY: updatedReplyArray };
      }
      return review;
    });

    // 보드 문서 업데이트
    await updateDoc(docRef, {
      BOARD_REVIEW: updatedReviewArray,
    });
    return true;
  }
}

// 대댓글(REVIEW_REPLY) 삭제
async function deleteReply(collectionName, docId, reviewId, replyId) {
  console.log(reviewId, replyId);
  const docRef = doc(db, collectionName, docId);
  try {
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const boardReviewArray = docSnapshot.data().BOARD_REVIEW || [];

      // REVIEW_ID가 reviewId와 일치하는 객체 찾기
      const reviewToUpdate = boardReviewArray.find(
        (review) => review.REVIEW_ID === reviewId
      );

      if (reviewToUpdate) {
        // REVIEW_REPLY 배열에서 replyId가 일치하는 대댓글 제외
        const updatedReplyArray = reviewToUpdate.REVIEW_REPLY.filter(
          (reply) => reply.REPLY_ID !== replyId
        );

        // REVIEW_REPLY를 제외한 나머지 속성들은 그대로 유지
        const updatedReviewToUpdate = {
          ...reviewToUpdate,
          REVIEW_REPLY: updatedReplyArray,
        };

        // 새로운 BOARD_REVIEW 배열 생성 (기존 REVIEW_ID에 해당하는 객체를 업데이트)
        const updatedBoardReviewArray = boardReviewArray.map((review) =>
          review.REVIEW_ID === reviewId ? updatedReviewToUpdate : review
        );

        // 보드 문서 업데이트
        await updateDoc(docRef, {
          BOARD_REVIEW: updatedBoardReviewArray,
        });

        return true;
      } else {
        console.error("해당 REVIEW_ID를 찾을 수 없습니다.");
        return false;
      }
    } else {
      console.error("보드 문서가 존재하지 않습니다.");
      return false;
    }
  } catch (error) {
    console.error("Error deleting reply:", error);
    return false;
  }
}

// 이미지 추가 함수
async function uploadImage(text, imgFile) {
  console.log(imgFile);
  const id = uuidv4(); // uuidv4 함수를 사용하여 UUID 생성

  // 경로 Board 이름 바꿔야할수도있음 ------------------------------------------------------------------------------------------------------
  const path = `${text}/${id}`;
  console.log(path);
  // Firebase Storage를 사용하기 위해 스토리지 인스턴스를 생성합니다.
  // 인스턴스를 반환합니다.
  const storage = getStorage();
  // 스토리지 인스턴스와 이미지의 경로를 사용하여 이미지에 대한 참조(Reference)를 생성합니다.
  const imageRef = ref(storage, path);
  console.log(imageRef);
  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);

  // 저장한 File의 url 을 받아온다.
  const url = await getDownloadURL(imageRef);
  console.log(url);
  return url;
}

// 이미지 추가 및 삭제 함수
async function uploadDeleteImage(text, imgFile, nickName, prevImageUrl) {
  console.log(imgFile);
  console.log(nickName);
  console.log(prevImageUrl);
  const id = uuidv4(); // uuidv4 함수를 사용하여 UUID 생성

  // 경로 Board 이름 바꿔야할수도있음 ------------------------------------------------------------------------------------------------------
  const path = `${text}/${nickName}/${id}`;
  console.log(path);
  // Firebase Storage를 사용하기 위해 스토리지 인스턴스를 생성합니다.
  // 인스턴스를 반환합니다.
  const storage = getStorage();

  try {
    // 전 이미지가 있으면
    if (prevImageUrl) {
      // 기존 이미지의 참조를 가져옵니다.
      const prevImage = ref(storage, prevImageUrl);
      console.log(prevImage);
      // 기존 이미지를 삭제합니다.
      await deleteObject(prevImage);
    }
  } catch (error) {
    console.log(error);
  }

  // 새로운 이미지 참조
  const newImageRef = ref(storage, path);
  console.log(newImageRef);
  // File 객체를 스토리지에 저장
  await uploadBytes(newImageRef, imgFile);

  // 저장한 File의 url 을 받아온다.
  const url = await getDownloadURL(newImageRef);
  console.log(url);
  return url;
}

async function deleteImage(img) {
  const storage = getStorage();
  try {
    const deleteRef = ref(storage, img);
    console.log(img);
    await deleteObject(deleteRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
}

// 게시판 리스트 삭제기능
async function deleteDatas(collectionName, docId) {
  try {
    const rm = await deleteDoc(doc(db, collectionName, docId));
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
}

async function getChat(firstCollectionName, docId, secondCollectionName) {
  console.log(firstCollectionName, docId, secondCollectionName);
  const docRef = doc(db, firstCollectionName, docId);
  const collectionRef = collection(docRef, secondCollectionName);

  const collectionOrder = query(collectionRef, orderBy("MC_TIME"));

  const querySnapshot = await getDocs(collectionOrder);
  const result = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return result;
}

async function addChat(
  firstCollectionName,
  docId,
  secondCollectionName,
  chatData
) {
  console.log(firstCollectionName, docId, secondCollectionName, chatData);
  const docRef = doc(db, firstCollectionName, docId);
  const collectionRef = collection(docRef, secondCollectionName);
  try {
    const addChats = await addDoc(collectionRef, chatData);
    const docSnap = await getDoc(addChats);
    if (docSnap.exists()) {
      const review = { docId: docSnap.id, ...docSnap.data() };
      return review;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateChat(
  firstCollectionName,
  docId,
  secondCollectionName,
  data
) {
  console.log(firstCollectionName, docId, secondCollectionName, data);
  const docRef = doc(db, firstCollectionName, docId);
  const collectionRef = collection(docRef, secondCollectionName);
  const queryData = query(collectionRef, where("MC_READ", "!=", true));
  const querySnapshot = await getDocs(queryData);

  const updatePromises = querySnapshot.docs.map(async (docdoc) => {
    const docRef1 = doc(
      db,
      firstCollectionName,
      docId,
      secondCollectionName,
      docdoc.id
    );
    await updateDoc(docRef1, data);
    console.log(`문서 ${doc.id}이(가) 업데이트되었습니다.`);
    return true;
  });
}

async function realtimeChat(firstCollectionName, docId, secondCollectionName) {
  console.log(firstCollectionName, docId, secondCollectionName);
  const docRef = doc(db, firstCollectionName, docId);
  const collectionRef = collection(docRef, secondCollectionName);

  // orderBy 메서드를 사용하여 특정 필드를 기준으로 오름차순 정렬
  // limit 메서드를 사용하여 가져올 문서의 수를 제한
  const queryData = query(collectionRef, where("MC_READ", "==", false));

  const unsubscribe = await getDocs(queryData);
  // const result = querySnapshot.docs.map((doc) => ({
  //   docId: doc.id,
  //   ...doc.data(),
  // }));

  console.log(unsubscribe.docs.length);
  // 원하는 로직 수행 또는 상태 업데이트 등
  return unsubscribe.docs.length;
  // 반환된 unsubscribe 함수를 사용하여 이벤트 리스너를 해제할 수 있음
}

// 스토어 관련 함수들
// 스토어 관련 함수들
// 스토어 관련 함수들

// 스토어 아이템 추가 및 수정(파라미터를 조건으로 해서 state가 있으면 업데이트 없으면 추가하기)
async function addStoreItemData(collectionName, formData, state = null) {
  const time = new Date().getTime(); // ms까지 표시되는 시간
  // 이미지들 배열
  const imgArr = [];
  const uuid = crypto.randomUUID();

  // 이미지 등록부분
  async function processImage(img, index) {
    // img가 File의 경우(새로운 사진이 등록됨)
    if (typeof img === "object") {
      console.log("img가 File의 경우");
      const uuid = crypto.randomUUID();
      const path = `store/${uuid}`;
      const storage = getStorage();

      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, img);
      const url = await getDownloadURL(imageRef);

      console.log(imageRef);
      imgArr.push(url);
      console.log(imgArr);
      console.log(url);
    }
    // img가 string의 경우(기본의 값을 유지)
    else if (typeof img === "string") {
      console.log("img가 string의 경우");
      imgArr.push(img);
    }
  }

  // 병렬처리는 순서를 보장하지 않는다.
  // // formData.STORE_IMAGES 배열의 각 이미지에 대한 비동기 작업 처리
  // const promiseAddArray = formData.STORE_IMAGES.map(processImage);
  // // Promise.all : 모든 프로미스를 병렬 실행 후 모두 종료 시 반환 함.
  // await Promise.all(promiseAddArray);

  for (const img of formData.STORE_IMAGES) {
    await processImage(img);
  }

  // console.log(imgArr); 잘 나옴

  // 이미지 삭제부분
  async function deleteImage(img, index) {
    const storage = getStorage();
    if (img !== "initialValue" && img !== imgArr[index]) {
      const prevUrl = decodeURIComponent(img);
      console.log(prevUrl);
      const prevFileName = prevUrl.slice(
        prevUrl.lastIndexOf("/") + 1,
        prevUrl.indexOf("?")
      );
      const desertRef = ref(storage, `store/${prevFileName}`);
      //
      try {
        await deleteObject(desertRef);
        console.log(`Image ${prevFileName} deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting image ${prevFileName}:`, error);
      }
    } else {
      console.log("Skipping deletion of initial or previously deleted image.");
    }
  }

  if (state) {
    console.log("이미지 삭제코드 작동");
    // state.STORE_IMAGES 배열의 각 이미지에 대한 비동기 작업 처리
    // const promiseDeleteArray = state?.STORE_IMAGES.map(deleteImage);
    // await Promise.all(promiseDeleteArray);
    await state.STORE_IMAGES.map((img, index) => {
      deleteImage(img, index);
    });
  }

  // 고민의 흔적들
  // for (const img of formData.STORE_IMAGES) {
  //   if (img !== null) {
  //     const uuid = crypto.randomUUID();
  //     const path = `store/${uuid}`;

  //     // 파일을 저장하고 url을 받아온다.
  //     const storage = getStorage();
  //     const imageRef = ref(storage, path);
  //     await uploadBytes(imageRef, img);
  //     const url = await getDownloadURL(imageRef);

  //     console.log(imageRef);
  //     imgArr.push(url);
  //     console.log(imgArr);
  //     console.log(url);
  //   }
  // }

  formData.STORE_IMAGES = imgArr;
  state && state.STORE_DATE
    ? (formData.STORE_DATE = state.STORE_DATE)
    : (formData.STORE_DATE = time);
  formData.STORE_UPDATE = time;

  state && state.STORE_REVIEWS
    ? (formData.STORE_REVIEWS = state.STORE_REVIEWS)
    : (formData.STORE_REVIEWS = formData.STORE_REVIEWS = []);

  formData.STORE_RATING = 0;
  state && state.STORE_ID
    ? (formData.STORE_ID = state.STORE_ID)
    : (formData.STORE_ID = uuid);

  console.log("여기");
  console.log(formData);

  // 추가할 때의 함수와 수정할 떄의 함수(state 유무)
  if (state === null) {
    console.log("!state");
    const result = await addDoc(collection(db, collectionName), formData);
    const docSnap = await getDoc(result);
    console.log(result);
    console.log(docSnap.data());
    return docSnap.data();
  } else if (typeof state === "object") {
    console.log(state);
    const ref = doc(db, "Store", state.STORE_DOCID);

    await updateDoc(ref, formData);
  }
}

// 스토어 아이템 삭제
async function deleteStoreItemData(collectionName, state) {
  const storage = getStorage();
  for (const img of state.STORE_IMAGES) {
    console.log("확인");

    if (img !== "initialValue") {
      const prevUrl = decodeURIComponent(img);
      console.log(prevUrl);
      const prevFileName = prevUrl.slice(
        prevUrl.lastIndexOf("/") + 1,
        prevUrl.indexOf("?")
      );
      console.log(prevFileName);
      const desertRef = ref(storage, `store/${prevFileName}`);
      // 이미지 삭제
      console.log("이미지 삭제");
      await deleteObject(desertRef).catch((error) => {
        console.error("Error deleting image:", error);
      });
    }
  }

  console.log("문서삭제");
  const docRef = doc(db, collectionName, state?.STORE_DOCID);
  await deleteDoc(docRef);
}

// 리스트 가져오기(DOCID를 객체에 추가)
async function getStoreItemDatas(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  // console.log(querySnapshot);

  const result = querySnapshot.docs.map((doc) => ({
    STORE_DOCID: doc.id,
    ...doc.data(),
  }));
  return result;
}

// 아이템 가져오기
async function getStoreItemData(collectionName, docId) {
  console.log(collectionName);
  console.log(docId);
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  if (docSnap.exists()) {
    console.log(docSnap.data());
  }
  return docSnap.data();
}

// 리뷰작성
async function addStoreItemReviewData(collectionName, docId, review, item) {
  // console.log(collectionName);
  // console.log(docId);
  // console.log(review);
  // console.log(item.STORE_REVIEWS);

  const imgArr = [];
  // 이미지 서버 저장 및 url 추출 작업
  async function processImage(img) {
    // img가 File의 경우(새로운 사진이 등록됨)
    if (typeof img === "object") {
      console.log("img가 File의 경우");
      const uuid = crypto.randomUUID();
      const path = `store/${uuid}`;
      const storage = getStorage();

      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, img);
      const url = await getDownloadURL(imageRef);

      console.log(imageRef);
      imgArr.push(url);
      console.log(imgArr);
      console.log(url);
    }
    // img가 string의 경우(기본의 값을 유지)
    else if (typeof img === "string") {
      console.log("img가 string의 경우");
      imgArr.push(img);
    }
  }

  const q = query(
    collection(db, collectionName),
    where("STORE_ID", "==", item.STORE_ID)
  );

  // console.log(q);

  const querySnapshot = await getDocs(q);

  // console.log(querySnapshot);
  // console.log(querySnapshot.docs);
  // console.log(querySnapshot.docs[0].id);
  // 쿼리해서 docId를 찾을 수 있다.

  const docRef = doc(db, collectionName, querySnapshot.docs[0].id);

  // 리뷰를 이미 작성했는데 필터하는 부분
  const isIdExsist = querySnapshot.docs[0]
    .data()
    .STORE_REVIEWS.some((el) => el.MEM === review.MEM);
  console.log(isIdExsist);

  if (!isIdExsist) {
    try {
      console.log(review);
      console.log(review?.STORE_REVIEW_IMAGE);
      for (const img of review?.STORE_REVIEW_IMAGE) {
        // img가 정의되어 있는지 확인
        console.log("img", img);
        await processImage(img);
      }

      console.log("여긴 ?");
      review.STORE_REVIEW_IMAGE = imgArr;

      // 기존 리뷰들 배열에 구조분해로 삽입
      const newArr = [...item.STORE_REVIEWS, review];
      console.log(newArr);

      await updateDoc(docRef, {
        STORE_REVIEWS: arrayUnion(review),
      });
      return newArr;
    } catch (error) {
      console.log("여기일듯?");
      alert(error);
    }
  } else {
    alert("이미 리뷰를 작성하셨어요!!!");
  }
}

// 리뷰 삭제
async function deleteReviewData(collectionName, item, userId, state) {
  // console.log(collectionName);
  console.log(state.STORE_DOCID);
  // console.log(userId);

  const userArr = item.STORE_REVIEWS.find((obj) => obj.MEM === userId);
  console.log(userArr);

  // 리뷰 이미지 제거

  const tempRef = doc(db, collectionName, state.STORE_DOCID);
  // console.log(tempRef);

  const storage = getStorage();
  for (const img of userArr.STORE_REVIEW_IMAGE) {
    console.log(img);
    if (img !== "initialValue") {
      const prevUrl = decodeURIComponent(img);
      console.log(prevUrl);
      const prevFileName = prevUrl.slice(
        prevUrl.lastIndexOf("/") + 1,
        prevUrl.indexOf("?")
      );
      console.log(prevFileName);
      const desertRef = ref(storage, `store/${prevFileName}`);
      // 이미지 삭제
      console.log("이미지 삭제");
      await deleteObject(desertRef).catch((error) => {
        console.error("Error deleting image:", error);
      });
    }
  }

  const newArr = item.STORE_REVIEWS.filter((obj) => obj !== userArr);
  console.log(newArr);

  await updateDoc(tempRef, {
    STORE_REVIEWS: newArr,
  });

  return newArr;
}
// 장바구니 저장
async function addCartItem(collectionName, docId, data) {
  console.log(collectionName);
  console.log(docId);
  console.log(data);

  const isExist = await getDoc(doc(db, collectionName, docId));
  if (isExist?.data()) {
    console.log("godd");
    console.log(...isExist?.data().CART);
  }

  try {
    if (isExist?.data()) {
      await updateDoc(doc(db, collectionName, docId), {
        CART: [...isExist.data().CART, data],
      });
    } else {
      await setDoc(doc(db, collectionName, docId), {
        CART: [data],
      });
    }
    console.log("장바구니 저장 성공");
  } catch (error) {
    console.log(error);
  }
}

async function getCartItem(collectionName, docId) {
  console.log(collectionName);
  console.log(docId);
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  // console.log(docSnap.data());
  return docSnap.data()?.CART;
}

// 장바구니 삭제
async function deleteCartItem(collectionName, docId, arr, item) {
  console.log(collectionName);
  console.log(docId);
  console.log(arr);

  const result = item.filter(
    (obj1) => !arr.some((obj2) => isEqual(obj1, obj2))
  );

  function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => obj1[key] === obj2[key]);
  }

  console.log(result);

  await updateDoc(doc(db, collectionName, docId), {
    CART: result,
  });

  // arr에 date 넣어주기
  const time = new Date().getTime();
  console.log(time);
  console.log(arr);
  const newArr = arr.map((el, index, arr) => {
    return { ...el, CART_TIME: time };
  });
  console.log(newArr);

  await addCartItem("Order", docId, ...newArr);
}

export {
  getAddress,
  addData,
  nicknameComparison,
  getBoardData,
  getBoardContentData,
  getMainBoardData,
  uploadImage,
  addReview,
  deleteDatas,
  serverTimestamp,
  addReply,
  updateData,
  findEmail,
  pwCheckUpdate,
  increment,
  findPassword,
  updateReview,
  deleteReview,
  deleteImage,
  getStorage,
  db,
  updateReply,
  deleteReply,
  getManager,
  uploadDeleteImage,
  getChat,
  addChat,
  realtimeChat,
  addSetData,
  addStoreItemData,
  getStoreItemDatas,
  getStoreItemData,
  addStoreItemReviewData,
  deleteStoreItemData,
  deleteReviewData,
  addCartItem,
  getCartItem,
  deleteCartItem,
  updateChat,
  addChatRoom,
};
