import { NavLink } from "react-router-dom";
import public_url from "../../js/publicurl";

const PaySuccess = ()=>{
    return <section className="succpage">
        <div className="succ">
        <img src={public_url+'success.svg'} alt="" />
        <br />
        <br />
        <h3>Your order is succesfull</h3>
        <p>Thankyou for your order. Your order is currently under process. You can track your order through 'My Orders' panel after process has completed. A invoice containing order details have been sent to your email.</p>
        
        <NavLink className='succlink' to='/shop'>Continue Shopping</NavLink>
    </div>
    </section>
}

export default PaySuccess;