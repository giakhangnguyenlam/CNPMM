import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"

function Static() {
  const jwt = localStorage.getItem("jwt")
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const { setIsStatic, idStoreUpdate, reloadSell, setReloadSell } =
    useGlobalContext()
  const [screen, setScreen] = useState(false)
  const [orders, setOrders] = useState()
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()

  today = yyyy + "-" + mm + "-" + dd
  const [date, newDate] = useState({ date: today, type: "all" })

  const fetchData = async () => {
    let url = ""
    let dateUWant = new Date(date.date)
    let dateUHave = new Date(Date.now())
    if (dateUWant <= dateUHave) {
      if (date.type === "all") {
        url = `https://cnpmmbe.herokuapp.com/seller/order/${idStoreUpdate.id}/statusfinished`
      } else if (date.type === "day") {
        let ndd = String(dateUWant.getDate()).padStart(2, "0")
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()

        url = `https://cnpmmbe.herokuapp.com/seller/order/${idStoreUpdate.id}/date/${ndd}-${nmm}-${nyyyy}`
      } else if (date.type === "my") {
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()
        url = `https://cnpmmbe.herokuapp.com/seller/order/${idStoreUpdate.id}/month/${nmm}/year/${nyyyy}`
      }
      try {
        let res = await axios({
          method: "get",
          url,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (!res.data.length) {
          setOrders(null)
          setScreen(true)
        }
        if (res.status === 200 && res.data.length) {
          setOrders(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setOrders()
      setScreen(true)
    }
  }

  useEffect(() => {
    setScreen(false)
    fetchData()
  }, [date, reloadSell])

  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={() => setIsStatic(false)}></div>
      <div className='modal__body'>
        <div className='auth-form' style={{ width: wFit, height: hFit }}>
          <div className='auth-form__container'>
            <div
              className='auth-form__header'
              style={{ flexDirection: "column" }}
            >
              <h3 className='store-product__heading'>Thống kê</h3>
              <div className='store-product__header-add'>
                <label className='order__label'>Lọc theo:</label>
                <select
                  className='order__date'
                  onChange={(e) => {
                    setOrders(undefined)
                    newDate({ ...date, type: e.target.value })
                  }}
                >
                  <option value='day'>Ngày</option>
                  <option value='my'>Tháng Năm</option>
                </select>
                <input
                  type='date'
                  className='order__date'
                  value={date.date}
                  onChange={(e) => {
                    if (date.type === "all") {
                      setOrders(undefined)
                      newDate({ type: "day", date: e.target.value })
                    } else {
                      setOrders(undefined)
                      newDate({ ...date, date: e.target.value })
                    }
                  }}
                />
              </div>
              <div className='store-product__header-nav'>
                <div className='w60x store-product__header-nav-item w10'>
                  Mã đơn hàng
                </div>
                <div
                  className='store-product__header-nav-item'
                  style={{ width: "22%" }}
                >
                  Tên
                </div>
                <div
                  className='store-product__header-nav-item'
                  style={{ width: "14%" }}
                >
                  Số lượng
                </div>
                <div
                  className='store-product__header-nav-item'
                  style={{ width: "18%" }}
                >
                  Mô tả
                </div>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div
                className='store-product__body'
                style={{ height: (hFit - 158) * 0.92, width: "64%" }}
              >
                {orders ? (
                  orders.map((product, index) => {
                    const {
                      price,
                      productName,
                      orderId,
                      quantity,
                      description,
                    } = product
                    return (
                      <div className='store-product__body-item ' key={index}>
                        <div
                          className='store-item store-item__number'
                          style={{ width: "15.625%" }}
                        >
                          {orderId}
                        </div>
                        <div
                          className='store-item store-item__name'
                          style={{ width: "34.375%" }}
                        >
                          {productName}
                        </div>
                        <div
                          className='store-item store-item__amount'
                          style={{ width: "21.875%" }}
                        >
                          {quantity} x
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(price)}
                        </div>
                        <div
                          className='store-item store-item__desc'
                          style={{ flexGrow: "unset", width: "28.125%" }}
                        >
                          <div className='store-item__desc-content'>
                            {description}
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='order__wait '>
                    <div className='order__wait-content'>
                      {screen ? "Không có sản phẩm" : "Loading..."}
                    </div>
                  </div>
                )}
              </div>
              {orders ? (
                <div className='store-item store-item__static'>
                  <span>
                    {(date.type === "all" && "Từ lúc mở bán") ||
                      (date.type === "day" &&
                        `Vào ngày ${date.date.slice(8)}/${date.date.slice(
                          5,
                          7
                        )}/${date.date.slice(0, 4)}`) ||
                      `Vào tháng ${date.date.slice(5, 7)} năm ${date.date.slice(
                        0,
                        4
                      )}`}
                  </span>
                  <span>Bạn có {orders.length} đơn hàng</span>{" "}
                  <span>
                    Tổng giá trị là{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      orders.reduce(
                        (prev, cur) => prev + cur.price * cur.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
              ) : (
                <div className='store-item store-item__static'>
                  {screen ? "Không có sản phẩm" : "Loading..."}
                </div>
              )}
            </div>

            <div
              className='auth-form__controls'
              style={{
                justifyContent: "center",
                marginTop: "0",
                height: (hFit - 158) * 0.08,
              }}
            >
              <button
                className='btn btn--normal auth-form__controls-back'
                style={{
                  width: "100%",
                  height: (hFit - 158) * 0.07,
                  marginTop:
                    (hFit - 158) * 0.01 > 10 ? "10px" : (hFit - 158) * 0.01,
                }}
                onClick={() => setIsStatic(false)}
              >
                <i className='fas fa-undo' style={{ fontSize: "1.6rem" }}></i>
                THOÁT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Static