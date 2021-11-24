import axios from "axios"
import React, { useEffect, useState } from "react"
import { AiFillStar, AiFillHeart } from "react-icons/ai"
import ReactPaginate from "react-paginate"
import { useHistory } from "react-router"
import { useGlobalContext } from "./context"

function Product({ item }) {
  const { cate, cateType, searchInfo, body, setBody } = useGlobalContext()
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const history = useHistory()
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

  useEffect(() => {
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

  useEffect(() => {
    setPageCount(Math.ceil(body.length / item))
  }, [item, body])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * item) % body.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className='product'>
        <div className='grid__row' key={789}>
          {/* Product item */}
          {body.slice(itemOffset, itemOffset + item).map((item) => {
            if (item.name.includes(searchInfo)) {
              let {
                id,
                // storeId,
                category,
                name,
                quantity,
                price,
                // description,
                image,
              } = item
              if (category === 1) {
                category = "Quần áo"
              }
              if (category === 2) {
                category = "Giày"
              }
              if (category === 3) {
                category = "Phụ kiện"
              }
              return (
                <div className='grid__colum-2-4' key={id}>
                  <div
                    className='product-item'
                    key={id}
                    onClick={() => history.push(`/product/${id}`)}
                  >
                    <div
                      className='product-item__img'
                      style={{
                        backgroundImage: `url(${image})`,
                      }}
                    ></div>
                    <h4 className='product-item__name'>{name}</h4>
                    <div className='product-item__price'>
                      <span className='product-item__price-cur'>
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(price)}
                      </span>
                    </div>
                    <div className='product-item__action'>
                      <span className='product-item__action-like product-item__action-like--liked'>
                        <AiFillHeart className='product-item__action-like-icon product-item__heart' />
                        <AiFillHeart className='product-item__action-liked-icon product-item__heart' />
                      </span>
                      <div className='product-item__rating'>
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star--gold product-item__star' />
                        <AiFillStar className='product-item__star' />
                      </div>
                      <span className='product-item__sold'>còn {quantity}</span>
                    </div>
                    <div className='product-item__origin'>
                      <span className='product-item__brand'>{category}</span>
                      {/* <span className='product-item__origin-name'>Trung Quốc</span> */}
                    </div>
                    <div className='product-item__favorite'>
                      <i className='fas fa-check'></i>
                      <span>Yêu thích</span>
                    </div>
                  </div>
                </div>
              )
            }
          })}
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
        containerClassName='pagination product__pagination'
        activeClassName='pagination-item--active'
        renderOnZeroPageCount={null}
      />
    </>
  )
}

export default Product
