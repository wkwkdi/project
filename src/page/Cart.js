import { useEffect, useState } from "react";
import ShoppingBanner from "../components/Shopping-components/ShoppingBanner";
import styles from "./Cart.module.css";
import {
  deleteCartItem,
  getCartItem,
  getStoreItemDatas,
} from "../api/firebase";
import initialImg from "../assets/basket.svg";
import { useNavigate } from "react-router-dom";
import ysImg from "../assets/캐릭터만.gif";

let arr = [];

function Cart() {
  // console.log(arr);
  const user = JSON.parse(localStorage.getItem("Member"));

  const [item, setItem] = useState([]);
  const [storeItem, setStoreItem] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  // console.log(item);
  // const [selectedCart, setSelectedCart] = useState([]);

  const navigate = useNavigate();

  const onLoad = async () => {
    const arr = await getCartItem("ShoppingCart", user[0].MEM);
    const tempArr = await getStoreItemDatas("Store");
    setItem(arr?.sort((a, b) => a.CART_TIME - b.CART_TIME));
    setStoreItem(tempArr ? tempArr : []);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 일부선택 함수
  const handleSelected = (e, el, index) => {
    if (selectedAll) {
      setSelectedAll(false);
    }
    console.log(e.target);
    if (e.target.checked) {
      console.log("추가");
      if (!arr.includes(el)) {
        arr.push(el);
      }
    } else {
      console.log("삭제");
      if (arr.includes(el)) {
        arr = arr.filter((element) => element !== el);
      }
    }

    console.log(arr);

    const newArr = [...item];
    console.log(newArr[index]);
    newArr[index].selected = e.target.checked;
    setItem(newArr);
  };

  // 전체선택 함수
  const handleSelectedAll = (e) => {
    console.log(e.target.checked);
    setSelectedAll(e.target.checked);
    if (e.target.checked) {
      arr = item;
    } else {
      arr = [];
    }
    console.log(arr);

    const isChecked = e.target.checked;
    setSelectedAll(isChecked);
    const newArr = [...item];
    newArr.forEach((el) => {
      el.selected = isChecked;
    });
    setItem(newArr);
  };

  useEffect(() => {
    const allSelected = item?.length > 0 && item.every((el) => el.selected);
    setSelectedAll(allSelected);
  }, [item]);

  // 구매하기(장바구니에서 선택된 아이템 삭제) 함수
  const bandleDeleteBtn = async () => {
    try {
      await deleteCartItem("ShoppingCart", user[0].MEM, arr, item);
      alert("구매 갑사합니다!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <>
      <ShoppingBanner title={`장바구니`} summary={`자, 결심의 시간이에요!`} />
      <div className={styles.container}>
        {item?.length > 0 ? (
          <>
            <p className={styles.title}>장바구니</p>
            <div className={styles.content}>
              <p className={styles.contentTitle}>상품정보</p>
              <div className={styles.sortBox}>
                <input
                  type="checkbox"
                  style={{ width: "24px", height: "24px" }}
                  onChange={(e) => handleSelectedAll(e)}
                  checked={selectedAll}
                />
                <p>상품정보</p>
                <p>수량</p>

                <p>구매금액</p>
              </div>
              <ul className={styles.cartList}>
                {item?.map((el, index, arr) => {
                  const targetElement = storeItem.find(
                    (element) => element.STORE_ID === el.CART_ITEM_CODE
                  );
                  // console.log(targetElement);
                  return (
                    <li
                      key={index}
                      className={
                        index === arr.length - 1
                          ? `${styles.itemBox} ${styles.lastItemBox}`
                          : styles.itemBox
                      }
                    >
                      <input
                        type="checkbox"
                        style={{ width: "24px", height: "24px" }}
                        onChange={(e) => handleSelected(e, el, index)}
                        checked={el.selected || false}
                      />
                      <div className={styles.itemTitles}>
                        <img
                          src={
                            targetElement
                              ? targetElement.STORE_IMAGES[0]
                              : initialImg
                          }
                          className={styles.cartItemImg}
                        />
                        <p>{targetElement.STORE_NAME}</p>
                      </div>
                      <p className={styles.count}>{el.CART_ITEM_COUNT}</p>
                      <p className={styles.itemPrice}>
                        {(
                          Number(targetElement.STORE_PRICE) * el.CART_ITEM_COUNT
                        ).toLocaleString()}{" "}
                        원
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div
                className={styles.btn}
                onClick={() => {
                  bandleDeleteBtn();
                }}
              >
                구매하기
              </div>
            </div>
          </>
        ) : (
          <div className={styles.emptyCart}>
            <p className={styles.emptyCartTitle}>장바구니가 비었어요!</p>
            <img
              className={styles.emptyCartImg}
              src={ysImg}
              alt="장바구니 빈 이미지"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
