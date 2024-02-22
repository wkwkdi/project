import Button from "../Button";
import styled from "styled-components";
import styles from "./BuddyNav.module.css"
import { useState } from "react";

const SelectBtn = styled(Button)`

`

function BuddyNav({ selectedButton, setBtn, btn, setBtnRef }) {

    const [btnCheck, setBtnCheck] = useState("000")

    const handleBtnClick = (e, text) => {
        setBtnCheck(text)
        // console.log(e.target);
        setBtnRef.current = e.target.lastChild.value;
        // console.log(selectedItemRef);
        // 클릭한 요소의 다음 형제 노드의 텍스트 값을 가져와 출력
        // const hiddenValue = ref.current.nextSibling.textContent;
        setBtn(setBtnRef.current);
        console.log("Hidden Value:", setBtnRef.current);
    };
    return (
        <>
            <div className={styles.nav}>

                <Button
                    className={btnCheck == "000" ? styles.select : ""}
                    as={Button}
                    size="big"
                    //   selected={selectedButton === "buddyfind"}
                    onClick={(e) => handleBtnClick(e, "000")}
                >
                    버디찾기
                    <input type="hidden" value="000" />
                </Button>

                <Button
                    className={btnCheck == "001" ? styles.select : ""}
                    as={Button}
                    size="big"
                    // onClick={() => handleButtonClick("buddyMy")}
                    onClick={(e) => handleBtnClick(e, "001")}
                //   selected={selectedButton === "buddyfind"}
                >
                    나의 설정
                    <input type="hidden" value="001" />
                </Button>
            </div>
        </>
    )
}

export default BuddyNav