import { getOrderId } from "../../js/payment";
import Checkout from "../checkout/checkout";
import {useNavigate} from 'react-router-dom';

const  Cart=()=>{
   var navigate = useNavigate();
    return <div>
        <input type="number" id="amount" placeholder="Amount"/>
        <button onClick={async function(){
            var orderId;
            var amount = document.getElementById('amount').value;
            var currency;
            var orderStatus = await getOrderId(amount);
            if(orderStatus[0] == true){
                orderId = orderStatus[1].id;
                amount = orderStatus[1].amount;
                currency = orderStatus[1].currency;
                navigate(`/checkout/${orderId}/${amount}/${currency}`);
            }
        }}>Checkout</button>
    </div>
}

export default Cart;