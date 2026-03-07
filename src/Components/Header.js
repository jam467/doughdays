import React, { Component } from "react";
import { Fade } from "react-awesome-reveal";
import Menu from "./Menu";
import Modal from '@mui/material/Modal';
import cateringPDF from '../images/CateringMenu25.pdf';
import sweetscateringPDF from '../images/SweetsCateringMenu25.pdf';
function Header(props) {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  // React.useEffect(() => {
  //   try{
  //   getopenhours()
  //   }catch{

  //   }

  // }, [])

  const openPDF = (type) => () => {
    console.log(type);
    if (type === 'sweets') {
      window.open(sweetscateringPDF);
    } else {
      window.open(cateringPDF);
    }
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  // const getopenhours = () => {
  //   var request = {
  //     placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY44',
  //     fields: ['name', 'opening_hours']
  //   };
  //   var service = new window.google.maps.places.PlacesService(document.createElement('div'));
  //   service.getDetails(request, callback);

  //   function callback(place, status) {
  //     if (status == window.google.maps.places.PlacesServiceStatus.OK) {
  //       console.log(place)
  //     }
  //   }
  // }
  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: 'absolute',
    width: '90%',
    maxHeight: '90%',
    overflow: 'auto',
  }
  const handleOpenModal = () => {
    setModalIsOpen(true);
  }
  return (
    <header id="home" className="splash">

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={modalStyle}>
          <div id="simple-modal-description">
            <Menu closeModal={closeModal} />
          </div>
        </div>

      </Modal>
      <div id="nav-wrap">
        <a className="mobile-btn" href="#nav-wrap" title="Show navigation" style={{ float: "left", right: 0, backgroundColor: "#BF7B52" }}>
          Show navigation
        </a>
        <a className="mobile-btn" href="#home" title="Hide navigation" style={{ float: "left", right: 0, backgroundColor: "#BF7B52" }}>
          Hide navigation
        </a>

        <ul id="nav" className="nav" style={{ margin: "0px 0px 0px 0px", top: 0 }}>
          <li className="current" style={{ bottomBorder: "1px solid #F8E7CA" }}>
            <a className="smoothscroll" href="#home">
              Home
            </a>
          </li>

          <li>
            <a className="smoothscroll" href="" onClick={handleOpenModal} style={{ bottomBorder: "1px solid #F8E7CA" }}>
              Menu
            </a>
          </li>
          <li>
            <a type="application/pdf" rel="alternate" media="print" className="smoothscroll" onClick={openPDF()} style={{ bottomBorder: "1px solid #F8E7CA" }}>
              Catering Menu
            </a>
          </li>
          <li>
            <a type="application/pdf" rel="alternate" media="print" className="smoothscroll" onClick={openPDF('sweets')} style={{ bottomBorder: "1px solid #F8E7CA" }}>
              Sweets Catering Menu
            </a>
          </li>
          <li>
            <a className="smoothscroll" href="#about" style={{ bottomBorder: "1px solid #F8E7CA" }}>
              Pics
            </a>
          </li>

          {/* <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li> */}

          <li>
            <a className="smoothscroll" href="#contact" style={{ bottomBorder: "1px solid #F8E7CA" }}>
              Contact
            </a>
          </li>
        </ul>
      </div>

      <div className="row banner">
        <div className="banner-text">
          <Fade bottom>

            {/* {projects} */}
            <img alt={"Cut Lunch Deli"} src={"images/logos/CUT\ LUNCH\ DELI_LOGO_CREAM.png"} style={{ height: "300px" }} />
            {/* <h1 className="responsive-headline">{name}</h1> */}

          </Fade>
          <Fade bottom duration={1200}>

            {/* <h3>{description}.</h3> */}
          </Fade>
          <hr />

          <Fade bottom duration={2000}>
            <div className="MenuButtonDiv" >
              <button className="menubutton" onClick={handleOpenModal}>Menu</button>
            </div>
            <div className="MenuButtonDiv" >
              <button className="menubutton" onClick={openPDF()}>Catering Menu</button>
            </div>
            <div className="MenuButtonDiv" >
              <button className="menubutton" onClick={openPDF('sweets')}>Sweets Catering Menu</button>
            </div>
            <div className="MenuButtonDiv" >
              <button
                className="menubutton"
                onClick={() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book a Table
              </button>
            </div>
            {/* <ul className="social">
                <a href={project} className="button btn project-btn">
                  <i className="fa fa-book"></i>Project
                </a>
                <a href={github} className="button btn github-btn">
                  <i className="fa fa-github"></i>Github
                </a>
              </ul> */}
          </Fade>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href="#about">
          <i className="icon-down-circle"></i>
        </a>
      </p>
    </header>
  );

}

export default Header;
