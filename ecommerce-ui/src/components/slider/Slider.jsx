import React from 'react';
import "./slider.css";

const Slider = () => {
  return (
    <>

      <form className='form-div'>

        <input className='input-div' type="radio" name="fancy" autofocus value="clubs" id="clubs" />
        <input className='input-div' type="radio" name="fancy" value="hearts" id="hearts" />
        <input className='input-div' type="radio" name="fancy" value="spades" id="spades" />
        <input className='input-div' type="radio" name="fancy" value="diamonds" id="diamonds" />
        <label className='label-div' for="clubs">&#9827; Apple Phones</label><label className='label-div' for="hearts">&#9829; Mackbooks</label><label className='label-div' for="spades">&#9824; Spades</label><label className='label-div' for="diamonds">&#9830; Diamonds</label>

        <div class="keys"></div>
      </form>


    </>
  )
}

export default Slider