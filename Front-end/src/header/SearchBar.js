import React, { useRef } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { useGlobalContext } from "../context"

function SearchBar() {
  const { setSearchInfo } = useGlobalContext()
  let ref = useRef()
  let ref2 = useRef()
  let his = JSON.parse(localStorage.getItem("history")) || []
  const handleSearch = (type) => {
    if (type === "icon") {
      setSearchInfo(ref.current.value)
      if (ref.current.value !== "") {
        his.push(ref.current.value)
      }
      let newHis = []
      newHis = [...new Set(his)]
      localStorage.setItem("history", JSON.stringify(newHis))
    } else {
      setSearchInfo(type)
    }
    ref2.current.style.display = "none"
    setTimeout(() => {
      ref2.current.style = {}
    }, 100)
  }

  return (
    <div className='header__search'>
      <div className='header__search-input-warp'>
        <input
          ref={ref}
          type='text'
          className='header__search-input'
          placeholder='Nhập để tìm kiếm sản phẩm'
        />
        <div className='header__search-history' ref={ref2}>
          <h3 className='header__search-history-heading'>Lịch sử tìm kiếm</h3>
          <ul className='header__search-history-list'>
            {his.length
              ? his.map((item, index) => {
                  return (
                    <li
                      className='header__search-history-item'
                      key={index}
                      onClick={() => handleSearch(item)}
                    >
                      <div>{item}</div>
                    </li>
                  )
                })
              : ""}
          </ul>
        </div>
      </div>
      <button
        className='header__search-btn'
        onClick={() => handleSearch("icon")}
      >
        <AiOutlineSearch className='header__search-btn-icon' />
      </button>
    </div>
  )
}

export default SearchBar
