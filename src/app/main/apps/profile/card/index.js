import React, { useState, useRef, useEffect } from "react";
import { useForm } from '@fuse/hooks';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from "react-credit-cards";
import { useDispatch, useSelector } from 'react-redux';
import "react-credit-cards/es/styles-compiled.css";
import history from '@history';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  // formatFormData
} from "./utils";
import { getCreditCard, saveCreditCard, selectCreditCard } from '../store/creditCardSlice'
import withReducer from 'app/store/withReducer'; 
import reducer from '../store';

// const defaultFormState = {
//   name: 'Name',
//   number: '123456789012',
//   expiry: '1122',
//   cvc: '1234'
// };

function CreditCard(props) {
  const dispatch = useDispatch();
  const cardInfo = useSelector(selectCreditCard);
  const user = useSelector(({ auth }) => auth.user);
  const formRef = useRef(null);

  const [ state, setState ] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focused: "",
    formData: null
  });

  const [realState, setRealState] = useState({
    realNumber: "",
    realName: "",
    realExpiry: "",
    realCvc: "",
  });

  useEffect(() => {
		dispatch(getCreditCard({ uid: user.uid }));
	}, [dispatch]);

  useEffect(() => { 
    if(cardInfo.length > 0) {      
      const numberList = cardInfo[0].data.number.split(' ');
      const lastNumber = numberList[numberList.length - 1];
      setRealState({ 
        realNumber: cardInfo.number, 
        realName: cardInfo.name, 
        realExpiry: cardInfo.expiry, 
        realCvc: cardInfo.cvc 
      });
      setState({ 
        name: 'XXX', 
        number: `XXXX XXXX XXXX ${lastNumber}`, 
        expiry: 'XX/XX', cvc: 'XXX' 
      });
    }
  }, [cardInfo]);

  const handleInputFocus = ({ target }) => {
    setState({
      ...state,
      focused: target.name
    });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState({ ...state, [target.name]: target.value });    
  };

  const handleSubmit = e => { 
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    
    dispatch(saveCreditCard({ ...formData, uid: user.uid }));
    history.push({ pathname: '/pages/profile/business' });
  };

  return (
    <div className='w-full'>         
      {/* <Card
        number={state.number}
        name={state.name}
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focused}
        callback={handleCallback}
      /> */}
      <form className="flex flex-col justify-center w-full" ref={formRef} onSubmit={handleSubmit}>
        <TextField
          type="text"
          name="name"
          className="my-16"
          value={state.name}
          label="Name of Credit Card Holder"                
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
        <TextField
          type="tel"
          name="number"
          className="mb-16"
          label="Credit Card"
          value={state.number}
          pattern="[\d| ]{16,22}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
        
        <TextField
          type="tel"
          name="expiry"
          className="mb-16"
          label="Expiration Date"
          value={state.expiry}
          pattern="\d\d/\d\d"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
        <TextField
          type="tel"
          name="cvc"
          className="mb-16"
          label="CVV"
          value={state.cvc}
          pattern="\d{3,4}"
          required
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          variant="outlined"
        />
                
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16 normal-case"
          aria-label="REGISTER WITH FIREBASE"
          // disabled={!isFormValid}
        >
          Sign up
        </Button>
      </form>     
    </div>
  );
}

export default withReducer('profileApp', reducer)(CreditCard);