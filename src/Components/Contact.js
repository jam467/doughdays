import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import $ from "jquery";
import SimpleMap from "./Comps/map";

export default function Contact(props) {
  const [sending, setSending] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [conName, setConName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [conMessage, setConMessage] = React.useState('');
  const [openHours, setOpenHours] = React.useState([]);
  const name = props.data ? props.data.name : '';
  const street = props.data ? props.data.address.street : '';
  const city = props.data ? props.data.address.city : '';
  const state = props.data ? props.data.address.state : '';
  const zip = props.data ? props.data.address.zip : '';
  const myemail = props.data ? props.data.email : '';
  const message = props.data ? props.data.contactmessage : '';

  const sendForm = () => {
        setSending(true);
        $.ajax({
          type: "POST",
      url: "https://email.cutlunchdeli.com.au/email",
      contentType: "application/json",
      dataType: "json",
      crossDomain:true,
      data:JSON.stringify({"message":formatMessage(conMessage),
      "subject":subject,
      "name":conName,
      "email":email}),
      success: () => {
        console.log("SENT");
        setFail(false);
        setSuccess(true);
        setSending(false);
      },
      error: function (xhr, status, err) {
        console.log(err);
        setSending(false);
        setSuccess(false);
        setFail(true);
      }
    });
  }
  const formatMessage = (mes) => {
    var start =0;
    while(mes.indexOf('\n',start)>=0){
      start = mes.indexOf('\n',start);
      mes = mes.substring(0,start)+'<br/>'+mes.substring(start,mes.length);
      start=start+6;
    }
    return mes;
  }
  const getOpenHours = (map,maps) =>{
    var request = {
          placeId: 'ChIJzQwiA56zEmsRFuUi8FFFkzk',
          fields: ['name', 'opening_hours']
        };
        var service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, callback);
    
        function callback(place, status) {
          if (status == window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(place)
            setOpenHours(place.opening_hours?place.opening_hours.weekday_text:[]);
          }
        }
  }

  return (
    <section id="contact">
      <Fade bottom duration={1000}>
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>
      </Fade>

      <div className="row">
        <Slide left duration={1000}>
          <div className="eight columns">
            {/* <form action="" method="post" id="contactForm" name="contactForm"> */}
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    id="contactName"
                    name="contactName"
                    onChange={(val)=>{setConName(val.target.value)}}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    id="contactEmail"
                    name="contactEmail"
                    onChange={(val)=>{setEmail(val.target.value)}}
                  />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    defaultValue=""
                    size="35"
                    id="contactSubject"
                    name="contactSubject"
                    onChange={(val)=>{setSubject(val.target.value)}}
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    cols="50"
                    rows="15"
                    id="contactMessage"
                    name="contactMessage"
                    onChange={(val)=>{setConMessage(val.target.value)}}
                    ></textarea>
                </div>

                <div>
                  <button className="submit" onClick={sendForm}>Submit</button>
                  {sending ? <span id="image-loader2">
                    <img alt="" src="images/loader.gif" />
                  </span> : ''}
            {fail ? <span id="message-warning2" style={{color:"red"}}> Error sending message, refresh and try again</span> : ""}
            {success ? <span id="message-success2">
              <i className="fa fa-check"></i>Your message was sent, thank you!
              <br />
            </span> : ""}
                </div>
              </fieldset>
            {/* </form> */}

          </div>
        </Slide>
       
        <Slide right duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact" >
              <p className="address">
                {name}
                <br />
                {street} <br />
                {city}, {state} {zip}
                <br />
                <span>{myemail}</span>
              </p>
              <SimpleMap getOpenHours={getOpenHours}/>
              <h4 style={{paddingTop:"28px"}}>Opening Hours</h4>
              <p className="address">
                {openHours.map((oh)=>{
                  return (<React.Fragment><span>{oh}</span><br/></React.Fragment>)
                })}
                <br />
              </p>
            </div>
          </aside>
        </Slide>
        
        <Slide right duration={1000}>
          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              
            </div>
          </aside>
        </Slide>
        
      </div>
    </section>
  );
}

