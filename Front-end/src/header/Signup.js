import { useEffect, useState } from "react"
import axios from "axios"
import { useGlobalContext } from "../context"
import { formAuth } from "../ultis/data"
import Loading from "../ultis/Loading"

const Signup = () => {
  const hFit = window.screen.availHeight
  const resp = hFit < 1000 ? true : false
  const {
    setIsLogin,
    isSignup,
    setIsSignup,
    isSellerSignup,
    setIsSellerSignup,
    isShipperSignup,
    setIsShipperSignup,
    reloadSell,
    setReloadSell,
    loading,
    setLoading,
  } = useGlobalContext()
  const [errors, setErrors] = useState({})
  const [person, setPerson] = useState({
    name: "",
    dateofbirth: "",
    email: "",
    gender: "",
    username: "",
    password: "",
    rePassword: "",
    address: "",
    phone: "",
  })
  const handlechange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setPerson({ ...person, [name]: value })
  }
  const changeLogin = () => {
    if (isSignup) {
      setIsSignup(false)
    }
    if (isSellerSignup) {
      setIsSellerSignup(false)
    }
    if (isShipperSignup) {
      setIsShipperSignup(false)
    }
    setIsLogin(true)
  }
  const handleModal = () => {
    setIsSignup(false)
    setIsSellerSignup(false)
    setIsShipperSignup(false)
  }
  const checkError = async (person) => {
    let errs = {}
    if (!person.name) {
      errs.name = "Không được bỏ trống trường này!"
    }
    if (!person.dateofbirth) {
      errs.dateofbirth = "Không được bỏ trống trường này!"
    } else {
      const persBirth = new Date(person.dateofbirth)
      const currDay = new Date()
      if (currDay < persBirth) {
        errs.dateofbirth = "Lỗi! Ngày tháng năm sinh không hợp lệ"
      }
    }

    if (!person.email) {
      errs.email = "Không được bỏ trống trường này!"
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(person.email)
    ) {
      errs.email = "Sai định dạng email"
    }
    if (!person.gender) {
      errs.gender = "Không được bỏ trống trường này!"
    }
    if (!person.username) {
      errs.username = "Không được bỏ trống trường này!"
    }
    if (!person.password) {
      errs.password = "Không được bỏ trống trường này!"
    } else if (!/^[a-zA-Z][a-zA-Z0-9!@#$%^&*]{7,16}$/.test(person.password)) {
      errs.password =
        "Mật khẩu chứa chữ cái và số, bắt đầu bằng chữ, dài từ 7-16 ký tự"
    }
    if (!person.rePassword) {
      errs.rePassword = "Không được bỏ trống trường này!"
    } else if (person.rePassword !== person.password) {
      errs.rePassword = "Không khớp với mật khẩu ở trên"
    }
    setErrors(errs)
    return errs
  }
  const fetchData = async () => {
    setLoading(true)
    const { rePassword, ...rest } = person
    const dateBirth = rest.dateofbirth
    const dd = dateBirth.slice(8)
    const mm = dateBirth.slice(5, 7)
    const yyyy = dateBirth.slice(0, 4)
    let url = ""
    if (isSignup) {
      url = "https://cnpmmbe.herokuapp.com/signup"
    }
    if (isSellerSignup) {
      url = "https://cnpmmbe.herokuapp.com/seller/signup"
    }
    if (isShipperSignup) {
      url = "https://cnpmmbe.herokuapp.com/shipper/signup"
    }

    try {
      let res = await axios.post(url, {
        ...person,
        dateofbirth: `${dd}-${mm}-${yyyy}`,
      })
      if (res.status === 201) {
        if (isSignup || isSellerSignup) {
          const {
            id,
            name,
            dateofbirth,
            email,
            address,
            phone,
            gender,
            jwt,
            role,
          } = res.data
          localStorage.setItem("id", id)
          localStorage.setItem("name", name)
          localStorage.setItem("dateofbirth", dateofbirth)
          localStorage.setItem("email", email)
          localStorage.setItem("address", address)
          localStorage.setItem("phone", phone)
          localStorage.setItem("gender", gender)
          localStorage.setItem("jwt", jwt)
          localStorage.setItem("role", role)
          localStorage.setItem("expire", new Date().getTime() + 43200000)
        }
        setLoading(false)
        setReloadSell(!reloadSell)
        setIsSignup(false)
        setIsSellerSignup(false)
        setIsShipperSignup(false)
      }
    } catch (error) {
      if (error.response) {
        setErrors({ form: error.response.data.mess })
        setLoading(false)
      }
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await checkError(person)
    if (Object.keys(res).length === 0) {
      fetchData()
    }
  }
  useEffect(() => {}, [reloadSell])

  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={handleModal}></div>
      <div className='modal__body'>
        {/* Register form */}
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>
                {isSignup
                  ? "Đăng ký"
                  : isSellerSignup
                  ? "Trở thành người bán"
                  : "Trở thành người giao hàng"}
              </h3>
              <span className='auth-form__switch-btn' onClick={changeLogin}>
                Đăng nhập
              </span>
            </div>

            {resp ? (
              <div className='auth-form__form'>
                <div className='auth-form__group' key={1}>
                  <input
                    type={formAuth[0].type}
                    name={formAuth[0].name}
                    placeholder={formAuth[0].placeholder}
                    className={`auth-form__input ${
                      errors[formAuth[0].name] && "auth-form__input--err"
                    } `}
                    value={person[formAuth[0].name]}
                    onChange={handlechange}
                  />
                  {errors[formAuth[0].name] ? (
                    <p className='auth-form__error'>
                      {errors[formAuth[0].name]}
                    </p>
                  ) : (
                    " "
                  )}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className='auth-form__group--resp' key={2}>
                    <input
                      type={formAuth[1].type}
                      name={formAuth[1].name}
                      placeholder={formAuth[1].placeholder}
                      className={`auth-form__input ${
                        errors[formAuth[1].name] && "auth-form__input--err"
                      } `}
                      value={person[formAuth[1].name]}
                      onChange={handlechange}
                    />
                    {errors[formAuth[1].name] ? (
                      <p className='auth-form__error'>
                        {errors[formAuth[1].name]}
                      </p>
                    ) : (
                      " "
                    )}
                  </div>
                  <div className='auth-form__group--resp' key={3}>
                    <input
                      type={formAuth[2].type}
                      name={formAuth[2].name}
                      placeholder={formAuth[2].placeholder}
                      className={`auth-form__input ${
                        errors[formAuth[2].name] && "auth-form__input--err"
                      } `}
                      value={person[formAuth[2].name]}
                      onChange={handlechange}
                    />
                    {errors[formAuth[2].name] ? (
                      <p className='auth-form__error'>
                        {errors[formAuth[2].name]}
                      </p>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
                <div className='auth-form__group' key={4}>
                  <input
                    type={formAuth[3].type}
                    name={formAuth[3].name}
                    placeholder={formAuth[3].placeholder}
                    className={`auth-form__input ${
                      errors[formAuth[3].name] && "auth-form__input--err"
                    } `}
                    value={person[formAuth[3].name]}
                    onChange={handlechange}
                  />
                  {errors[formAuth[3].name] ? (
                    <p className='auth-form__error'>
                      {errors[formAuth[3].name]}
                    </p>
                  ) : (
                    " "
                  )}
                </div>
                <div className='auth-form__group' key={5}>
                  <input
                    type={formAuth[4].type}
                    name={formAuth[4].name}
                    placeholder={formAuth[4].placeholder}
                    className={`auth-form__input ${
                      errors[formAuth[4].name] && "auth-form__input--err"
                    } `}
                    value={person[formAuth[4].name]}
                    onChange={handlechange}
                  />
                  {errors[formAuth[4].name] ? (
                    <p className='auth-form__error'>
                      {errors[formAuth[4].name]}
                    </p>
                  ) : (
                    " "
                  )}
                </div>
                <div className='auth-form__group' key={6}>
                  <input
                    type={formAuth[5].type}
                    name={formAuth[5].name}
                    placeholder={formAuth[5].placeholder}
                    className={`auth-form__input ${
                      errors[formAuth[5].name] && "auth-form__input--err"
                    } `}
                    value={person[formAuth[5].name]}
                    onChange={handlechange}
                  />
                  {errors[formAuth[5].name] ? (
                    <p className='auth-form__error'>
                      {errors[formAuth[5].name]}
                    </p>
                  ) : (
                    " "
                  )}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className='auth-form__group--resp' key={7}>
                    <input
                      type={formAuth[6].type}
                      name={formAuth[6].name}
                      placeholder={formAuth[6].placeholder}
                      className={`auth-form__input ${
                        errors[formAuth[6].name] && "auth-form__input--err"
                      } `}
                      value={person[formAuth[6].name]}
                      onChange={handlechange}
                    />
                    {errors[formAuth[6].name] ? (
                      <p className='auth-form__error'>
                        {errors[formAuth[6].name]}
                      </p>
                    ) : (
                      " "
                    )}
                  </div>
                  <div className='auth-form__group--resp' key={8}>
                    <input
                      type={formAuth[7].type}
                      name={formAuth[7].name}
                      placeholder={formAuth[7].placeholder}
                      className={`auth-form__input ${
                        errors[formAuth[7].name] && "auth-form__input--err"
                      } `}
                      value={person[formAuth[7].name]}
                      onChange={handlechange}
                    />
                    {errors[formAuth[7].name] ? (
                      <p className='auth-form__error'>
                        {errors[formAuth[7].name]}
                      </p>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
                <div className='auth-form__group'>
                  <select
                    className={`auth-form__input ${
                      errors.gender && "auth-form__input--err"
                    }`}
                    name='gender'
                    onChange={handlechange}
                  >
                    <option value='null'>Chọn giới tính</option>
                    <option value='male'>Nam</option>
                    <option value='female'>Nữ</option>
                  </select>
                  {errors.gender ? (
                    <p className='auth-form__error'>{errors.gender}</p>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            ) : (
              <div className='auth-form__form'>
                {formAuth.map((ele, index) => {
                  const { name, type, placeholder } = ele
                  return (
                    <div className='auth-form__group' key={index}>
                      <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className={`auth-form__input ${
                          errors[name] && "auth-form__input--err"
                        } `}
                        value={person[name]}
                        onChange={handlechange}
                      />
                      {errors[name] ? (
                        <p className='auth-form__error'>{errors[name]}</p>
                      ) : (
                        " "
                      )}
                    </div>
                  )
                })}
                <div className='auth-form__group'>
                  <select
                    className={`auth-form__input ${
                      errors.gender && "auth-form__input--err"
                    }`}
                    name='gender'
                    onChange={handlechange}
                  >
                    <option value='null'>Chọn giới tính</option>
                    <option value='male'>Nam</option>
                    <option value='female'>Nữ</option>
                  </select>
                  {errors.gender ? (
                    <p className='auth-form__error'>{errors.gender}</p>
                  ) : (
                    " "
                  )}
                </div>
              </div>
            )}

            <div className='auth-form__aside'>
              <p className='autho-form__policy'>
                Bằng việc đăng ký, bạn đã đồng ý với shop về
                <a href='/dkdv' className='auth-form__text-link'>
                  Điều khoản dịch vụ
                </a>{" "}
                &
                <a href='/csbm' className='auth-form__text-link'>
                  Chính sách bảo mật
                </a>
              </p>
            </div>

            {errors["form"] ? (
              <p className='auth-form__error'>{errors["form"]}</p>
            ) : (
              " "
            )}

            <div
              className={`auth-form__controls ${resp && "responsive__margin"}`}
            >
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={handleModal}
              >
                TRỞ LẠI
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default Signup
