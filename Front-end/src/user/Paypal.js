import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../context"

function Paypal({ value }) {
  const paypal = useRef()
  const { setpaid } = useGlobalContext()

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value,
                },
              },
            ],
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture()
          setpaid(true)
          return order
        },
        onError: (err) => console.log(err),
      })
      .render(paypal.current)
  }, [])

  return <div ref={paypal} style={{ height: "120px" }}></div>
}

export default Paypal
