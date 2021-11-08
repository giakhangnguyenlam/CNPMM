import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router"

function UserPass() {
  const jwt = localStorage.getItem("jwt")
  const userid = localStorage.getItem("id")
  const name = localStorage.getItem("name")
  const [password, setPassword] = useState("")
  const history = useHistory()

  const handleRedirect = (page) => {
    history.push(`/user/${page}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await axios({
        method: "PUT",
        url: `https://cnpmmbe.herokuapp.com/user/password/${userid}`,
        data: { password },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      if (res.status === 200) {
        setPassword("")
        let { jwtNew } = res.data
        localStorage.setItem("jwt", jwtNew)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid__row contain'>
          <div className='grid__colum-2'>
            <nav className='category'>
              <h3
                className='category__heading'
                style={{ lineHeight: "2.2rem", padding: "10px 0" }}
              >
                Xin chào, {name}
              </h3>
              <ul className='category-list'>
                <h4
                  className='category-list__heading'
                  onClick={() => handleRedirect("account/profile")}
                >
                  Tài khoản
                </h4>
                <li className='category-item'>
                  <div
                    onClick={() => handleRedirect("account/profile")}
                    className='category-item__link'
                  >
                    Hồ sơ người dùng
                  </div>
                </li>
                <li className='category-item category-item--active'>
                  <div
                    onClick={() => handleRedirect("account/password")}
                    className='category-item__link'
                  >
                    Quản lý mật khẩu
                  </div>
                </li>
                <h4
                  className='category-list__heading'
                  onClick={() => handleRedirect("order")}
                >
                  Đơn mua
                </h4>
              </ul>
            </nav>
          </div>

          <div className='grid__colum-10'>
            <div className='product'>
              <div className='grid__row'>
                <div
                  className='auth-form__container'
                  style={{
                    width: "100%",
                    backgroundColor: "var(--white-color)",
                  }}
                >
                  <div
                    className='auth-form__header'
                    style={{
                      borderBottom: "1px solid #c3c3c3",
                      margin: "4px 0",
                    }}
                  >
                    <h4
                      className='auth-form__heading'
                      style={{
                        margin: "0",
                        padding: "10px 0",
                        fontSize: "1.8rem",
                        lineHeight: "2.2rem",
                      }}
                    >
                      {" "}
                      Quản lý mật khẩu
                    </h4>
                  </div>

                  <div
                    className='auth-form__form'
                    style={{ marginTop: "10px" }}
                  >
                    <div className='auth-form__group'>
                      <div className='auth-form__group-item'>
                        <label
                          className='auth-form__label'
                          style={{ width: "25%" }}
                        >
                          Mật khẩu mới
                        </label>
                        <input
                          type='password'
                          className='auth-form__input'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className='auth-form__controls'
                    style={{ justifyContent: "center" }}
                  >
                    <button
                      className='btn btn--primary'
                      onClick={(e) => handleSubmit(e)}
                    >
                      XÁC NHẬN
                    </button>
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

export default UserPass
