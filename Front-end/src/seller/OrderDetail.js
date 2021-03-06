import axios from "axios"
import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import Loading from "../ultis/Loading"

function OrderDetail() {
  const jwt = localStorage.getItem("jwt")
  const wFit = window.screen.availWidth * 0.8
  const hFit = window.screen.availHeight * 0.835
  const {
    setIsOrderDetail,
    idStoreUpdate,
    reloadSell,
    setReloadSell,
    loading,
    setLoading,
  } = useGlobalContext()
  const [screen, setScreen] = useState(false)
  const [orders, setOrders] = useState()
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, "0")
  let mm = String(today.getMonth() + 1).padStart(2, "0")
  let yyyy = today.getFullYear()

  today = yyyy + "-" + mm + "-" + dd
  const [date, newDate] = useState(today)

  const handleCheck = async (id) => {
    setLoading(true)
    try {
      let res = await axios({
        method: "put",
        url: `https://cnpmmbe.herokuapp.com/seller/orderdetail/status/${id}`,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setLoading(false)
        setReloadSell(!reloadSell)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async () => {
    let url = ""
    let dateUWant = new Date(date)
    let dateUHave = new Date(Date.now())
    if (dateUWant <= dateUHave) {
      if (
        dateUWant.getDate() === dateUHave.getDate() &&
        dateUWant.getMonth() === dateUHave.getMonth() &&
        dateUWant.getFullYear() === dateUHave.getFullYear()
      ) {
        url = `https://cnpmmbe.herokuapp.com/seller/order/${idStoreUpdate.id}`
      } else {
        let ndd = String(dateUWant.getDate()).padStart(2, "0")
        let nmm = String(dateUWant.getMonth() + 1).padStart(2, "0")
        let nyyyy = dateUWant.getFullYear()

        url = `https://cnpmmbe.herokuapp.com/seller/order/${idStoreUpdate.id}/date/${ndd}-${nmm}-${nyyyy}`
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
          setOrders(res.data.reverse())
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
      <div
        className='modal__overlay'
        onClick={() => setIsOrderDetail(false)}
      ></div>
      <div className='modal__body'>
        <div className='auth-form' style={{ width: wFit, height: hFit }}>
          <div className='auth-form__container'>
            <div
              className='auth-form__header'
              style={{ flexDirection: "column" }}
            >
              <h3 className='store-product__heading'>????n h??ng c???a t??i</h3>
              <div className='store-product__header-add'>
                <label className='order__label'>Ch???n ng??y:</label>
                <input
                  type='date'
                  className='order__date'
                  value={date}
                  onChange={(e) => newDate(e.target.value)}
                />
              </div>
              <div className='store-product__header-nav'>
                <div className='w60x store-product__header-nav-item w10'>
                  M?? ????n h??ng
                </div>
                <div
                  className='store-product__header-nav-item'
                  style={{ flexGrow: "1" }}
                >
                  T??n
                </div>
                <div className='store-product__header-nav-item w10'>
                  S??? l?????ng
                </div>
                <div className='store-product__header-nav-item w300x'>
                  M?? t???
                </div>
                <div className='store-product__header-nav-item w250x'>
                  Tr???ng th??i
                </div>
                <div className='store-product__header-nav-item w10'>
                  Thao t??c
                </div>
              </div>
            </div>

            <div
              className='store-product__body'
              style={{ height: (hFit - 158) * 0.92 }}
            >
              {orders ? (
                orders.map((product, index) => {
                  const {
                    id,
                    productName,
                    orderId,
                    quantity,
                    description,
                    status,
                  } = product
                  return (
                    <div className='store-product__body-item ' key={index}>
                      <div
                        className='store-item store-item__number'
                        style={{ width: "10%" }}
                      >
                        {orderId}
                      </div>
                      <div
                        className='store-item store-item__name'
                        style={{ flexGrow: "1" }}
                      >
                        {productName}
                      </div>
                      <div className='store-item store-item__amount'>
                        {quantity}
                      </div>
                      <div
                        className='store-item store-item__desc w300x'
                        style={{ flexGrow: "unset" }}
                      >
                        <div className='store-item__desc-content'>
                          {description}
                        </div>
                      </div>
                      <div className='store-item w250x'>{status}</div>
                      <div className='store-item' style={{ width: "8.5%" }}>
                        <div
                          className='store-item__btn'
                          onClick={() => handleCheck(id)}
                        >
                          X??c nh???n
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className='order__wait '>
                  <div className='order__wait-content'>
                    {screen ? "Kh??ng c?? s???n ph???m" : "Loading..."}
                  </div>
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
                onClick={() => setIsOrderDetail(false)}
              >
                <i className='fas fa-undo' style={{ fontSize: "1.6rem" }}></i>
                TR??? L???I
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default OrderDetail
