import axios from "axios"
import React, { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import logo1 from "../assets/img/logo1.png"
import { useGlobalContext } from "../context"

function AdminPage() {
  const jwt = localStorage.getItem("jwtA")
  const { adminPage, setAdminPage } = useGlobalContext()
  const [allUser, setAllUser] = useState()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  const fetchData = async () => {
    let url = ""
    if (adminPage === "user") {
      url = "https://cnpmmbe.herokuapp.com/admin/users"
    }
    if (adminPage === "seller") {
      url = "https://cnpmmbe.herokuapp.com/admin/sellers"
    }
    try {
      let res = await axios({
        method: "get",
        url,
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

  useEffect(() => {
    if (allUser) {
      setPageCount(Math.ceil(allUser.length / 20))
    }
  }, [allUser])

  const handleSwap = () => {
    if (adminPage === "user") {
      setAdminPage("seller")
    } else {
      setAdminPage("user")
    }
    setAllUser()
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 20) % allUser.length
    setItemOffset(newOffset)
  }
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
                      className={`w200px store__nav-tab ${
                        adminPage === "user" ? "store__nav-tab--active" : ""
                      }`}
                      onClick={() => handleSwap()}
                    >
                      T???t c??? ng?????i d??ng
                    </div>
                    <div
                      className={`w200px store__nav-tab ${
                        adminPage === "seller" ? "store__nav-tab--active" : ""
                      }`}
                      onClick={() => handleSwap()}
                    >
                      T???t c??? ng?????i b??n
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("unpay")}
                    >
                      Duy???t ng?????i giao h??ng
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("store")}
                    >
                      T???t c??? c???a h??ng
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("order")}
                    >
                      T???t c??? ????n h??ng
                    </div>
                    <div
                      className='w200px store__nav-tab'
                      onClick={() => setAdminPage("product")}
                    >
                      T???t c??? s???n ph???m
                    </div>
                  </div>
                </div>
                <div className='store__contain' style={{ marginTop: "10px" }}>
                  <div className='store__contain-wrap--enhance'>
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
                          Th??ng tin li??n l???c
                        </div>
                        <div className='store-item__info-nav'>
                          Th??ng tin c?? nh??n
                        </div>
                      </div>
                    </div>
                    {allUser ? (
                      allUser
                        .slice(itemOffset, itemOffset + 20)
                        .map((product, index) => {
                          let {
                            username,
                            name,
                            dateofbirth,
                            email,
                            address,
                            phone,
                            gender,
                          } = product
                          if (gender === "male") {
                            gender = "Nam"
                          } else if (gender === "female") {
                            gender = "N???"
                          }
                          return (
                            <div className='store__contain-item' key={index}>
                              <div
                                className='store-product__body-item '
                                style={{ border: "1px solid #979797" }}
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
                                  {username}
                                </div>
                                <div
                                  className='store-item__info'
                                  style={{ borderRight: "1px solid #979797" }}
                                >
                                  <div className='store-item__info-item'>
                                    S??t: {phone}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Email: {email}
                                  </div>
                                  <div className='store-item__info-item'>
                                    ?????a ch???: {address}
                                  </div>
                                </div>
                                <div className='store-item__info'>
                                  <div className='store-item__info-item'>
                                    T??n: {name}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Sinh nh???t: {dateofbirth}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Ph??i: {gender}
                                  </div>
                                  <div className='store-item__info-item'>
                                    Hi???n ??ang l??{" "}
                                    {adminPage === "user"
                                      ? "ng?????i d??ng"
                                      : "ng?????i b??n h??ng"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                    ) : (
                      <div
                        className='store__contain-item'
                        style={{
                          height: "calc(100% - 50px)",
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          className='store-product__body-item '
                          style={{
                            display: "unset",
                            width: "unset",
                            fontSize: "26px",
                          }}
                        >
                          Loading...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <ReactPaginate
                  nextLabel='>'
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={pageCount}
                  previousLabel='<'
                  pageClassName='pagination-item'
                  pageLinkClassName='pagination-item__link'
                  previousClassName='pagination-item'
                  previousLinkClassName='pagination-item__link'
                  nextClassName='pagination-item'
                  nextLinkClassName='pagination-item__link'
                  breakLabel='...'
                  breakClassName='pagination-item'
                  breakLinkClassName='pagination-item__link'
                  containerClassName='pagination admin__pagination'
                  activeClassName='pagination-item--active'
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
