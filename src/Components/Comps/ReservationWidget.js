import { useEffect, useRef } from 'react';
import './ReservationWidget.css';

const OpenTableWidget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//www.opentable.com.au/widget/reservation/loader?rid=298124&type=standard&theme=standard&color=1&dark=false&iframe=true&domain=comau&lang=en-AU&newtab=true&ot_source=Restaurant%20website&cfe=true';
    script.type = 'text/javascript';
    script.async = true;

    if (widgetRef.current) {
      widgetRef.current.innerHTML = ''; // Clear any previous content
      widgetRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="reservation-container">
      <div ref={widgetRef} className="reservation-widget" />
      <noscript>
        <p>
          <a href="https://www.opentable.com.au/r/after-hours-by-cut-lunch-deli-reservations-randwick?restref=298124&lang=en-AU&ot_source=Restaurant%20website">
            Book a table on OpenTable
          </a>
        </p>
      </noscript>
    </div>
  );
};

export default OpenTableWidget;
