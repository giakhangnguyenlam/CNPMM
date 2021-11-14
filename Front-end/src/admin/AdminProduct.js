import axios from "axios"
import React, { useEffect, useState } from "react"
import logo1 from "../assets/img/logo1.png"
import { useGlobalContext } from "../context"

function AdminProduct() {
  const jwt = localStorage.getItem("jwtA")
  const { adminPage, setAdminPage } = useGlobalContext()
  const [allUser, setAllUser] = useState()
  const fetchData = async () => {
    try {
      let res = await axios({
        method: "get",
        url: "https://cnpmmbe.herokuapp.com/admin/products",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setAllUser(res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
  }, [adminPage])
  return (
    <div
      className='container'
      style={{ backgroundImage: `url(${logo1})`, backgroundColor: "unset" }}
    >
      <div className='grid' style={{ overflow: "hidden" }}>
        <div className='grid__row'>
          <div className='grid__colum-12'>
            <div className='store'>
              <div className='store-wrap'>
                <div className='store__nav-wrap'>
                  <div className='store__nav-options'>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("user")}
                    >
                      {" "}
                      Tất cả người dùng
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("seller")}
                    >
                      Tất cả người bán
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("store")}
                    >
                      Tất cả cửa hàng
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("order")}
                    >
                      Tất cả đơn hàng
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("unpay")}
                    >
                      ĐH chưa thanh toán
                    </div>
                    <div className='w200px store__nav-tab store__nav-tab--active'>
                      Tất cả sản phẩm
                    </div>
                  </div>
                </div>
                <div className='store__contain' style={{ marginTop: "10px" }}>
                  <div
                    className='store__contain-wrap'
                    style={{ height: "85vh", overflowX: "hidden" }}
                  >
                    <div className='store__contain-item'>
                      <div
                        className='store-product__body-item '
                        style={{
                          border: "1px solid #979797",
                          fontWeight: "600",
                          height: "40px",
                        }}
                      >
                        <div
                          className='store-item store-item__number'
                          style={{ borderRight: "1px solid #979797" }}
                        >
                          Stt
                        </div>
                        <div
                          className='store-item w300x'
                          style={{ borderRight: "1px solid #979797" }}
                        >
                          Username
                        </div>
                        <div
                          className='store-item__info-nav'
                          style={{ borderRight: "1px solid #979797" }}
                        >
                          Thông tin liên lạc
                        </div>
                        <div className='store-item__info-nav'>
                          Thông tin cá nhân
                        </div>
                      </div>
                    </div>
                    <div className='store__contain-item'>
                      {allUser
                        ? allUser.map((product, index) => {
                            let {
                              image,
                              name,
                              price,
                              quantity,
                              storeId,
                              category,
                              description,
                            } = product

                            if (category === 1) {
                              category = "Quần áo"
                            } else if (category === 2) {
                              category = "Giày dép"
                            } else if (category === 3) {
                              category = "Phụ kiện"
                            }
                            return (
                              <div
                                className='store-product__body-item '
                                style={{ border: "1px solid #979797" }}
                                key={index}
                              >
                                <div
                                  className='store-item store-item__number'
                                  style={{ borderRight: "1px solid #979797" }}
                                >
                                  {index + 1}
                                </div>
                                <div
                                  className='store-item w300x'
                                  style={{ borderRight: "1px solid #979797" }}
                                >
                                  <div
                                    className='store-item__img'
                                    style={{ backgroundImage: `url(${image})` }}
                                  ></div>
                                </div>
                                <div
                                  className='store-item__info'
                                  style={{ borderRight: "1px solid #979797" }}
                                >
                                  <div className='store-item__info-item'>
                                    Tên sản phẩm: {name}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Số lượng: {quantity}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Giá: {price}
                                  </div>
                                </div>
                                <div className='store-item__info'>
                                  <div className='store-item__info-item'>
                                    Mã cửa hàng: {storeId}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Loại sản phẩm: {category}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Mô tả: {description}
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProduct
