// import { db } from '../api/firebase';
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// async function chatMessage(event) {
//     event.preventDefault();

//     // 메시지가 비어있지 않은 경우에만 전송
//     if (message) {
//         const chatId = [currentUser.id, otherUser.id].sort().join('-');
//         const messageCollection = collection(db, "chats", chatId, "messages");

//         // Firestore에 메시지 추가
//         await addDoc(messageCollection, {
//             text: message,
//             createdAt: new Date(),
//             senderId: currentUser.id,
//         });

//         // 메시지 입력 필드 초기화
//         setMessage('');
//     }
// }

// export default chatMessage