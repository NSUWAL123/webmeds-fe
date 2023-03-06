import axios from "axios";

let khalticonfig = {
    // replace this key with yours
    "publicKey": process.env.REACT_APP_KHALTI_PUBLIC_KEY,
    "productIdentity": process.env.REACT_APP_KHALTI_SECRET_KEY,
    "productName": "webmeds",
    "productUrl": "http://localhost:3000/",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            axios.post('http://localhost:5000/payment/initiatePayment', payload)
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default khalticonfig;