import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function Menu(props) {
  console.log(props)

  const FoodItem = (props) => {
    return (<Grid container spacing={2}>
      <Grid item xs={10} sm={10} md={10}>
        <div className="foodItem"> {props.item} </div>
        {props.desc ? <div className="foodDesc"> {props.desc}</div> : ''}
      </Grid>
      <Grid item xs={2} sm={2} md={2}>
        {props.price ? <div className="foodItem">${props.price}</div> : ''}
        {props.addPrice ? <div className="foodDesc">${props.addPrice}</div> : ''}
        {props.stringOp ? <div className="foodItem">{props.stringOp}</div> : ''}
      </Grid>
    </Grid>)
  }

  return (
    <div className="menuOverall">
      <IconButton className="exitIcon" aria-label="close" onClick={props.closeModal}>
                <CloseIcon style={{color:"white"}} />
              </IconButton>
      <h2 className="FullTitle">Cut Lunch Deli</h2>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <div className="foodGroup">
            <div className="foodTitle">BREAKIE <span className="titleDetail">until 11am</span></div>
            <FoodItem item={"Avo Toast"} desc={"Add Chilli Oil"} price={12} addPrice={1}/>
            <FoodItem item={"Bacon, Egg & Cheese"} desc={"Chilli Mayo"} price={16} />
          </div>
          <div className="foodGroup">
            <div className="foodTitle">TOASTIES <span className="titleDetail">all day</span></div>
            <FoodItem item={"Misomite"} desc={"Miso, Vegemite & Cheddar"} price={12} />
            <FoodItem item={"Kimcheese"} desc={"Three Cheese & Kimchi"} price={16} />
            <FoodItem item={"Tuna Melt"} desc={"Provolone, Capers, Dill & Onion"} price={16} />
          </div>
          <div className="foodGroup">
            <div className="foodTitle">Add Ons</div>
            <FoodItem item={"Hell's Horses Hot Sauce"} />
            <FoodItem item={"Ham"} price={5} />
            <FoodItem item={"Cheese"} price={2} />
          </div>
           <div className="foodGroup">
            <div className="foodTitle">XMAS Special</div>
            <FoodItem item={"Cranberry Sauce, Brie, Crispy Bacon, Turkey, Pickled Red Cabbage, Mayo"} price={20} />
          </div>
          <br/>
          <br/>
          {/* <FoodItem item={"Add Ham or Mortadella"} price={'4/6'} /> */}
          <FoodItem item={"Public holiday surcharge"} stringOp={'10%'} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="foodGroup">
            <div className="foodTitle">SANDOS <span className="titleDetail">from 10:30am</span></div>
            <FoodItem item={"Schnitz"} desc={"Sweet zucchini pickle mayo, sesame panko crumb, pickled red onion, shredduce"} price={20} />
            <FoodItem item={"Morty D"} desc={"Mortadella, pistachio pesto, stracciatella, basil, guindilla"} price={20} />
            {/* <FoodItem item={"Oh So (vgn)"} desc={"Miso eggplant, sesame dressing, pickled radish, crispy onion, slaw"} price={19} /> */}
            <FoodItem item={"Korean Fried Mushroom"} desc={"Sticky sauce, kimchi slaw & pickled radish"} price={20} />
            <FoodItem item={"Sun Kissed (v)"} desc={"Nashi pear, halloumi, olive, almond, cucumber, pickled onion, mint yoghurt dressing"} price={19} />
            {/* <FoodItem item={"Miss Deli"} desc={"Ham, salami, prosciutto, provolone, red onion, giardiniera, shredduce & chilli"} price={20} /> */}
            <FoodItem item={"Obviously Good"} desc={"Capsicum pesto, smoked ham, cheddar, tomato, lettuce, red onion"} price={20} />
            {/* <FoodItem item={"Le Jambon"} desc={"Ham, comte cheese, cornichons, mustard & rocket"} price={19} /> */}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="foodGroup">
            <div className="foodTitle">COFFEE</div>
            <FoodItem item={"Regular"} price={5} />
            <FoodItem item={"Large"} price={5.5} />
            <FoodItem item={"Add Almond, Soy or Oat Milk"} price={0.5} />
            <FoodItem item={"Batch"} price={'4.5/5'} />
          </div>
          <div className="foodGroup">
            <div className="foodTitle">TEA</div>
            <FoodItem item={"Green"} price={4} />
            <FoodItem item={"English Breakfast"} price={4} />
            <FoodItem item={"Sticky Chai"} price={5} />
            <FoodItem item={"Turmeric"} price={5} />
          </div>
          <div className="foodGroup">
            <div className="foodTitle">ICED</div>
            <FoodItem item={"Latte"} price={'5.5'} />
            <FoodItem item={"Batch"} price={'5'} />
            <FoodItem item={"Oat Chai"} price={'5.5'} />
            <FoodItem item={"Green Tea"} price={5} />
            <FoodItem item={"Milo Milkshake"} price={9} />
            <FoodItem item={"Matcha"} price={'7.5'} />
          </div>
          {/* <div className="foodGroup">
            <div className="foodTitle">OTHER</div>
            <FoodItem item={"Hats"} price={35} />
          </div> */}
        </Grid>
      </Grid>
    </div>


  );
}

