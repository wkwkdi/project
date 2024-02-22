// 로그아웃  
// 카카오 로그아웃 
export default function kakaoLogout() {
  window.Kakao.API.request({
    url: '/v1/user/unlink',
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}