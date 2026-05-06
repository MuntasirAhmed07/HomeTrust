import React from 'react';
import handshake from '../../assets/Handshake.png';
import './letsConnect.css';

const LetsConnect = () => {
  return (
    <section className="lets-connect">
      <div className="lets-connect-image">
        <img src={handshake} alt="Handshake" />
      </div>
      <div className="lets-connect-content">
        <h2>
          LET'S <br /> CONNECT
        </h2>
        <div className="client-section">
          <h3>Clients</h3>
          <p>
            Explore the finest real estate opportunities with{' '}
            <strong>Hometrust Living Ltd</strong>. where trust meets excellence
            in real estate. Whether you're looking for your dream home, a
            promising investment, or a premium commercial space, we are here to
            turn your vision into reality.
          </p>
        </div>
        <div className="landowners-section">
          <h3>Landowners</h3>
          <p>
            <strong>Hometrust Living Ltd</strong> invites you to collaborate
            with us through a land-sharing partnership, where we turn your
            property into a modern, high-value development while ensuring the
            best returns for you.
          </p>
          <p>
            Let's create something exceptional together! Your land, our
            expertise-shared success.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LetsConnect;
