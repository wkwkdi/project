import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useEffect, useState } from "react";
import Container from "./Container";
import styled from "styled-components";
import Button from "./Button";
function Agree() {
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [term1Checked, setTerm1Checked] = useState(false);
  const [term2Checked, setTerm2Checked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // 동의 체크 상태 변경 시 전체동의하기 체크박스 상태 업데이트
    setAgreementChecked(term1Checked && term2Checked);
  }, [term1Checked, term2Checked]);

  const handleAgreementChange = (event) => {
    const checked = event.target.checked;
    setAgreementChecked(checked);
    setTerm1Checked(checked);
    setTerm2Checked(checked);
  };

  const handleTerm1Change = (event) => {
    setTerm1Checked(event.target.checked);
  };

  const handleTerm2Change = (event) => {
    setTerm2Checked(event.target.checked);
  };

  const onClick = () => {
    if (agreementChecked) {
      navigate("SignUp");
    } else {
      alert("전체동의 해주십시오");
    }
  };

  const SelectBtn = styled(Button)`
    width: 100%;
    background-color: #1e326d;
    color: #fff;
    margin: 50px auto 0;
  `;
  return (
    <div>
      <Container className={styles.container}>
        <h1 className={styles.h1}>이용정보 동의하기</h1>
        <div className={styles.checkboxWrap}>
          <input
            type="checkbox"
            id="agreement"
            className={styles.input}
            checked={agreementChecked}
            onChange={handleAgreementChange}
          />
          <label htmlFor="agreement">전체동의하기</label>
        </div>
        <div className={styles.textareaWrap}>
          <textarea className={styles.block} style={{ whiteSpace: "pre-wrap" }}>
            {

              "제 1 조 (목적)본 약관은 ○○○이 운영하는 웹 사이트 제 2 조 (용어의 정의)본 약관에서 사용하는 용어는 다음과 같이 정의한다.①회원 : 기본 회원 정보를 입력하였고, 회사와 서비스 이용계약을 체결하여 아이디를 부여받은 개인②아이디(ID) : 회원식별과 회원의 서비스 이용을 위해 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합 ③비밀번호(Password) : 회원이 통신상의 자신의 비밀을 보호하기 위해 선정한 문자와 숫자의 조합④해지 : 회사 또는 회원에 의한 이용계약의 종료제 3 조 (약관의 공시 및 효력과 변경)①본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시한다②본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.제 4 조 (약관 외 준칙)본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.제 2 장 이용계약제 5 조 (이용신청)①이용신청자가 회원가입 안내에서 본 약관과 개인정보보호정책에 동의하고 등록절차(회사의 소정 양식의 가입 신청서 작성)를 거쳐 확인 버튼을 누르면 이용신청을 할 수 있다.②이용신청자는 반드시 실명과 실제 정보를 사용해야 하며 1개의 생년월일에 대하여 1건의 이용신청을 할 수 있다.③실명이나 실제 정보를 입력하지 않은 이용자는 법적인 보호를 받을 수 없으며, 서비스 이용에 제한을 받을 수 있다.제 6 조 (이용신청의 승낙)①회사는 제5조에 따른 이용신청자에 대하여 제2항 및 제3항의 경우를 예외로 하여 서비스 이용을 승낙한다.②회사는 아래 사항에 해당하는 경우에 그 제한사유가 해소될 때까지 승낙을 유보할 수 있다.가. 서비스 관련 설비에 여유가 없는 경우나. 기술상 지장이 있는 경우다. 기타 회사 사정상 필요하다고 인정되는 경우③회사는 아래 사항에 해당하는 경우에 승낙을 하지 않을 수 있다.가. 다른 사람의 명의를 사용하여 신청한 경우나. 이용자 정보를 허위로 기재하여 신청한 경우다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우라. 기타 회사가 정한 이용신청 요건이 미비한 경우제 3 장 계약 당사자의 의무제 7 조 (회사의 의무)①회사는 사이트를 안정적이고 지속적으로 운영할 의무가 있다.②회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정될 경우에는 즉시 처리해야 한다. 단, 즉시 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 공지사항 또는 전자우편을 통해 통보해야 한다.③제1항의 경우 수사상의 목적으로 관계기관 및 정보통신윤리위원회의 요청이 있거나 영장 제시가 있는 경우, 기타 관계 법령에 의한 경우는 예외로 한다.제 8 조 (이용자의 의무)①이용자는 본 약관 및 회사의 공지사항, 사이트 이용안내 등을 숙지하고 준수해야 하며 기타 회사의 업무에 방해되는 행위를 해서는 안된다.②이용자는 회사의 사전 승인 없이 본 사이트를 이용해 어떠한 영리행위도 할 수 없다.③이용자는 본 사이트를 통해 얻는 정보를 회사의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송 및 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없다.제 4 장 서비스의 제공 및 이용제 9 조 (서비스 이용)①이용자는 본 약관의 규정된 사항을 준수해 사이트를 이용한다.②본 약관에 명시되지 않은 서비스 이용에 관한 사항은 회사가 정해 공지사항에 게시하거나 또는 별도로 공지하는 내용에 따른다.제 10 조 (정보의 제공)회사는 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보에 대하여 전자메일이나 서신우편 등의 방법으로 회원에게 정보를 제공할 수 있다.제 11 조 (광고게재)①회사는 서비스의 운용과 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고 등을 게재할 수 있다.②회사는 사이트에 게재되어 있는 광고주의 판촉활동에 회원이 참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는 손해에 대해 책임을 지지 않는다.제 12 조 (서비스 이용의 제한)본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 회사는 해당 이용자의 이용을 제한할 수 있다.①공공질서 및 미풍양속, 기타 사회질서를 해하는 경우②범죄행위를 목적으로 하거나 기타 범죄행위와 관련된다고 객관적으로 인정되는 경우③타인의 명예를 손상시키거나 타인의 서비스 이용을 현저히 저해하는 경우④타인의 의사에 반하는 내용이나 광고성 정보 등을 지속적으로 전송하는 경우⑤해킹 및 컴퓨터 바이러스 유포 등으로 서비스의 건전한 운영을 저해하는 경우⑥다른 이용자 또는 제3자의 지적재산권을 침해하거나 지적재산권자가 지적 재산권의 침해를 주장할 수 있다고 판단되는 경우⑦타인의 아이디 및 비밀번호를 도용한 경우본 약관은 2017년 07월 1일부터 적용한다."
            }
          </textarea>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={term1Checked}
              onChange={handleTerm1Change}
            />
            <p>이용약관에 동의합니다</p>
          </div>
          <textarea className={styles.block} style={{ whiteSpace: "pre-wrap" }}>
            {
              "제 1 장 총칙 제 1 조 (목적)본 약관은 ○○○이 운영하는 웹 사이트 (http://xxx.xxx.xxx)의 제반 서비스의 이용조건 및 절차에 관한 사항 및 기타 필요한 사항을 규정함을 목적으로 한다.제 2 조 (용어의 정의)본 약관에서 사용하는 용어는 다음과 같이 정의한다.①회원 : 기본 회원 정보를 입력하였고, 회사와 서비스 이용계약을 체결하여 아이디를 부여받은 개인②아이디(ID) : 회원식별과 회원의 서비스 이용을 위해 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합③비밀번호(Password) : 회원이 통신상의 자신의 비밀을 보호하기 위해 선정한 문자와 숫자의 조합④해지 : 회사 또는 회원에 의한 이용계약의 종료제 3 조 (약관의 공시 및 효력과 변경)①본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및 영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된 약관은 공지사항을 통해 공시한다②본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게 공시함으로써 효력을 발생한다.제 4 조 (약관 외 준칙)본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법, 정보통신촉진법, ‘전자상거래등에서의 소비자 보호에 관한 법률’, ‘약관의 규제에관한법률’, ‘전자거래기본법’, ‘전자서명법’, ‘정보통신망 이용촉진등에 관한 법률’, ‘소비자보호법’ 등 기타 관계 법령에 규정되어 있을 경우에는 그 규정을 따르도록 한다.제 2 장 이용계약제 5 조 (이용신청)①이용신청자가 회원가입 안내에서 본 약관과 개인정보보호정책에 동의하고 등록절차(회사의 소정 양식의 가입 신청서 작성)를 거쳐 '확인' 버튼을 누르면 이용신청을 할 수 있다.②이용신청자는 반드시 실명과 실제 정보를 사용해야 하며 1개의 생년월일에 대하여 1건의 이용신청을 할 수 있다.③실명이나 실제 정보를 입력하지 않은 이용자는 법적인 보호를 받을 수 없으며, 서비스 이용에 제한을 받을 수 있다.제 6 조 (이용신청의 승낙)①회사는 제5조에 따른 이용신청자에 대하여 제2항 및 제3항의 경우를 예외로 하여 서비스 이용을 승낙한다.②회사는 아래 사항에 해당하는 경우에 그 제한사유가 해소될 때까지 승낙을 유보할 수 있다.가. 서비스 관련 설비에 여유가 없는 경우나. 기술상 지장이 있는 경우다. 기타 회사 사정상 필요하다고 인정되는 경우③회사는 아래 사항에 해당하는 경우에 승낙을 하지 않을 수 있다.가. 다른 사람의 명의를 사용하여 신청한 경우나. 이용자 정보를 허위로 기재하여 신청한 경우다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우라. 기타 회사가 정한 이용신청 요건이 미비한 경우"
            }
          </textarea>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              checked={term2Checked}
              onChange={handleTerm2Change}
            />
            <p>이용약관에 동의합니다</p>
          </div>
          <SelectBtn>
            <div onClick={onClick}>확인</div>
          </SelectBtn>
        </div>
      </Container>
    </div>
  );
}

export default Agree;
