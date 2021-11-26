import React, { useState, useContext } from "react"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [searchInfo, setSearchInfo] = useState("")
  const [body, setBody] = useState([])
  const [orderData, setOrderData] = useState([])
  const [paid, setpaid] = useState(false)

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

  return (
    <AppContext.Provider
      value={{
        searchInfo,
        body,
        orderData,
        paid,
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
        setpaid,
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
