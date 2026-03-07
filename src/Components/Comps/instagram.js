import React, { useState, useEffect } from "react";
// import styled from "@emotion/styled"
// const Card = styled.img`
//   justify-self: center;
//   width: 300px;
//   height: 300px;
//   background-position: center;
//   background-repeat: no-repeat;
// `
// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   grid-gap: 10px;




const Insta = () => {
  const [insta, setInsta] = useState([]);
  useEffect(() => {


    var Script = 'var i,e,d=document,s="script";i=d.createElement("script");i.async=1;i.charset="UTF-8";i.src="https://cdn.curator.io/published/e867a7b2-f057-499e-9ff1-3c904a047cea.js";e=d.getElementsByTagName(s)[0];e.parentNode.insertBefore(i, e);'
    eval(Script)
  }, [])


  return (
    <div id="curator-feed-default-feed-layout"><a href="https://curator.io" target="_blank" class="crt-logo crt-tag"><span style={{color:"#F8E7CA"}}>Powered by Curator.io</span></a></div>
  );
};
export default Insta;

