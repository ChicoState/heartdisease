import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <><nav class="navbar">
      <div class="container">
        <a class="navbar-brand" href="/">❤️ Heart Health</a>
        <button class="navbar-toggle" type="button" onclick="toggleNav()">
          <span class="toggle-icon"></span>
        </button>
        <div class="nav-menu" id="navMenu">
          <ul class="nav-list">
            <li class="nav-item">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/framingham">Framingham Risk Score</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/ascvd">ASCVD Risk Estimator</a>
            </li>
          </ul>
        </div>
      </div>
      </nav><div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div class="row align-items-center mb-5">
    <div class="col-md-6">
        <h1 class="display-4 mb-4">Take Control of Your Heart Health</h1>
        <p class="lead">Understanding your heart disease risk factors is the first step toward a healthier future.</p>
        <h1 className="text-3xl font-bold mb-6">Health Risk Calculators</h1>
        <div className="com-md-6">
          <Link to="/framingham">
            <button className="btn btn-primary" style={{marginRight: 16 + 'px'}}>
              Framingham Risk Score
            </button>
          </Link>
        
          <Link to="/ascvd">
            <button className="btn btn-primary">
              ASCVD Risk Estimator
            </button>
          </Link>
        </div>
    </div>
    <div class="col-md-6">
        <img src="https://images.unsplash.com/photo-1690787628851-d36e285c29b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhlYXJ0JTIwaGVhbHRofGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1579154341058-50b75faf8e97" 
             alt="Healthcare professional" class="img-fluid rounded">
              </img>
              
    </div>
    </div>
</div>
    
    
    

      </>
  );
};

export default HomePage;
