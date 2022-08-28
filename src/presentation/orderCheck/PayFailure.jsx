import { NavLink, useParams } from "react-router-dom";
import public_url from "../../js/publicurl";

const PayFailure = ()=>{
    var {failReason} = useParams();
    var title = failReason === 'payment' ? 'Payment Failed!' : 'Order Failed!';
    var reason = failReason === 'payment' ? 'Your order was not made due to unsuccessfull payment. Please try again with another payment method or try again later.' : 'Your order not was made due to some unknown issue. Please try gain later. If issue keeps coming please contact our support team.'
    return <section className="failpage">
    <div className="fail">
    <img src={public_url+'wrong.svg'} alt="" />
    <br />
    <br />
    <h3>{title}</h3>
    <p>{reason}</p>
    
    <NavLink className='faillink' to='/cart'>Go to Cart</NavLink>
</div>
</section>
}

export default PayFailure;