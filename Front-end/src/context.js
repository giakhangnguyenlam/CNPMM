import axios from "axios"
import React, { useState, useContext, useEffect } from "react"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchInfo, setSearchInfo] = useState("")
  const [body, setBody] = useState([])
  const [orderData, setOrderData] = useState([])

  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [isSellerSignup, setIsSellerSignup] = useState(false)
  const [isShipperSignup, setIsShipperSignup] = useState(false)
  const [cate, setCate] = useState("")
  const [cateType, setCateType] = useState("")
  const [cateName, setCateName] = useState("")
  const [cart, setCart] = useState([])

  const [isCreateStore, setIsCreateStore] = useState(false)
  const [isUpdateStore, setIsUpdateStore] = useState(false)
  const [isDetailStore, setIsDetailStore] = useState(false)
  const [isDetailCreate, setIsDetailCreate] = useState(false)
  const [isDetailUpdate, setIsDetailUpdate] = useState(false)
  const [isDetailInfo, setIsDetailInfo] = useState(false)
  const [isOrderDetail, setIsOrderDetail] = useState(false)
  const [isStatic, setIsStatic] = useState(false)
  const [isComment, setIsComment] = useState(false)

  const [idStoreUpdate, setIdStoreUpdate] = useState(null)
  const [idStoreProd, setIdStoreProd] = useState(null)
  const [cateStoreProd, setCateStoreProd] = useState(null)
  const [reloadSell, setReloadSell] = useState(false)
  const [reloadDetailStore, setReloadDetailStore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [raise, setRaise] = useState(false)
  const [adminPage, setAdminPage] = useState("user")

  const [cateClo, setCateClo] = useState({
    type: "",
    brand: "",
    origin: "",
    size: [],
    color: [],
    material: "",
    gender: "",
    productId: "",
  })
  const [cateSho, setCateSho] = useState({
    style: "",
    sole: "",
    origin: "",
    size: [],
    color: [],
    height: "",
    weight: "",
    material: "",
    warranty: "",
    gender: "",
    productId: "",
  })
  const [cateAcc, setCateAcc] = useState({
    type: "",
    brand: "",
    origin: "",
    color: [],
    material: "",
    productId: "",
  })

  const clearCateClo = () =>
    setCateClo({
      type: "",
      brand: "",
      origin: "",
      size: [],
      color: [],
      material: "",
      gender: "",
      productId: "",
    })
  const clearCateSho = () =>
    setCateSho({
      style: "",
      sole: "",
      origin: "",
      size: [],
      color: [],
      height: "",
      weight: "",
      material: "",
      warranty: "",
      gender: "",
      productId: "",
    })
  const clearCateAcc = () =>
    setCateAcc({
      type: "",
      brand: "",
      origin: "",
      color: [],
      material: "",
      productId: "",
    })

  useEffect(() => {
    let url = "https://cnpmmbe.herokuapp.com/product"
    let categoryy =
      (cate === "1" && "clothes") ||
      (cate === "2" && "shoes") ||
      (cate === "3" && "accessories")

    if (cate) {
      url = `https://cnpmmbe.herokuapp.com/product/category/${cate}`
      if (cateType) {
        url = `https://cnpmmbe.herokuapp.com/product/category/${categoryy}/${cateType}`
      }
      if (cateType === "khac1" || cateType === "khac2") {
        url = `https://cnpmmbe.herokuapp.com/product/category/${categoryy}/khac`
      }
    }

    const fetchData = async () => {
      try {
        let res = await axios({
          method: "GET",
          url,
        })
        if (res.status === 200) {
          let arr = await res.data.filter((item) => item !== null)
          await setBody(arr)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [cate, cateType])

  return (
    <AppContext.Provider
      value={{
        searchInfo,
        body,
        orderData,
        isAdmin,
        isLogin,
        isSignup,
        isSellerSignup,
        isShipperSignup,
        cate,
        cateType,
        cateName,
        cart,
        reloadSell,
        reloadDetailStore,
        isCreateStore,
        isUpdateStore,
        isDetailStore,
        isDetailCreate,
        isDetailUpdate,
        isDetailInfo,
        isOrderDetail,
        isStatic,
        isComment,
        idStoreUpdate,
        idStoreProd,
        cateStoreProd,
        cateClo,
        cateSho,
        cateAcc,
        loading,
        raise,
        adminPage,
        setSearchInfo,
        setBody,
        setOrderData,
        setIsAdmin,
        setIsLogin,
        setIsSignup,
        setIsSellerSignup,
        setIsShipperSignup,
        setCate,
        setCateType,
        setCateName,
        setCart,
        setReloadSell,
        setReloadDetailStore,
        setIsCreateStore,
        setIsUpdateStore,
        setIsDetailStore,
        setIsDetailCreate,
        setIsDetailUpdate,
        setIsDetailInfo,
        setIsOrderDetail,
        setIsStatic,
        setIsComment,
        setIdStoreUpdate,
        setIdStoreProd,
        setCateStoreProd,
        setCateClo,
        setCateSho,
        setCateAcc,
        clearCateClo,
        clearCateSho,
        clearCateAcc,
        setLoading,
        setRaise,
        setAdminPage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
