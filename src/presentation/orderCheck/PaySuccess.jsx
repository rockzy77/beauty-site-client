import { NavLink } from "react-router-dom";
import public_url from "../../js/publicurl";

const PaySuccess = ()=>{
    return <section className="succpage">
        <div className="succ">
        <img src={public_url+'success.svg'} alt="" />
        <br />
        <br />
        <h3>Your order is succesfull</h3>
        <p>Thankyou for your order. A invoice containing order details have been sent to your email. You can track yout order through 'My Orders' Panel</p>
        
        <NavLink className='succlink' to='/cart'>Go to My Orders</NavLink>
    </div>
    </section>
}

export default PaySuccess;