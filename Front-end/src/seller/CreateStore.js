import axios from "axios"
import { React, useRef, useState } from "react"
import { useGlobalContext } from "../context"
import Loading from "../ultis/Loading"

function CreateStore() {
  const userId = localStorage.getItem("id")
  const jwt = localStorage.getItem("jwt")
  const {
    isCreateStore,
    setIsCreateStore,
    reloadSell,
    setReloadSell,
    loading,
    setLoading,
    setRaise,
  } = useGlobalContext()
  const refImg = useRef(null)
  const [error, setError] = useState()
  const [newStore, setNewStore] = useState({
    file: "",
    userId,
    nameStore: "",
    storeDescription: "",
  })
  const [fileName, setFileName] = useState("")

  const handleClick = () => {
    setIsCreateStore(!isCreateStore)
  }
  const handleUpImg = () => {
    refImg.current.click()
  }
  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let i = e.target.files[0]
      setFileName(i.name)
      setNewStore({ ...newStore, file: i })
    }
  }
  const uploadData = async () => {
    if (
      newStore.file &&
      newStore.userId + 1 &&
      newStore.nameStore &&
      newStore.storeDescription
    ) {
      setLoading(true)
      const data = new FormData()
      data.append("file", newStore.file)
      data.append("userId", newStore.userId)
      data.append("nameStore", newStore.nameStore)
      data.append("storeDescription", newStore.storeDescription)
      try {
        let res = await axios({
          method: "post",
          url: "https://cnpmmbe.herokuapp.com/seller/store",
          data,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        })
        if (res.status === 201) {
          setLoading(false)
          setReloadSell(!reloadSell)
          setIsCreateStore(false)
          setRaise({
            header: "Create store",
            content: "Create store success!",
            color: "#4bb534",
          })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setError("Vui l??ng cung c???p ?????y ????? th??ng tin")
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    uploadData()
  }

  return (
    <div className='modal'>
      <div className='modal__overlay' onClick={handleClick}></div>
      <div className='modal__body'>
        <div className='auth-form'>
          <div className='auth-form__container'>
            <div className='auth-form__header'>
              <h3 className='auth-form__heading'>T???o c???a h??ng m???i</h3>
            </div>

            <div className='auth-form__form'>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={newStore.nameStore}
                  onChange={(e) =>
                    setNewStore({ ...newStore, nameStore: e.target.value })
                  }
                  placeholder='T??n c???a h??ng'
                />
              </div>
              <div className='auth-form__group'>
                <input
                  type='text'
                  className='auth-form__input'
                  value={newStore.storeDescription}
                  onChange={(e) =>
                    setNewStore({
                      ...newStore,
                      storeDescription: e.target.value,
                    })
                  }
                  placeholder='M?? t??? v??? c???a h??ng'
                />
              </div>
              <div className='auth-form__group'>
                <input
                  ref={refImg}
                  type='file'
                  className='auth-form__input-file'
                  onChange={handleChange}
                />
                <div
                  className='auth-form__input auth-form__input-btn'
                  onClick={handleUpImg}
                >
                  {fileName ? fileName : "Ch???n ???nh"}
                </div>
              </div>
            </div>
            {error ? <p className='auth-form__error'>{error}</p> : " "}

            <div
              className='auth-form__controls'
              style={{ justifyContent: "center" }}
            >
              <button
                className='btn btn--normal auth-form__controls-back'
                onClick={handleClick}
              >
                TR??? L???I
              </button>
              <button className='btn btn--primary' onClick={handleSubmit}>
                T???O C???A H??NG
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  )
}

export default CreateStore
