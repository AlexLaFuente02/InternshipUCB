<template>
    <div class="container">
      <div class="card">
        <div class="box">
          <div class="content">
            <h2>{{a}}</h2><!--NUMEO-->
            <h3>{{b}}</h3><!--CARD ONE-->
            <p><strong>Nombre :</strong> {{c }}</p><!--descripcion-->
            <p><strong>Correo :</strong> {{d }}</p><!--descripcion-->
            <p><strong>Contacto : </strong> {{e }}</p><!--descripcion-->
            <a @click="JhessPayasita()">Reconsiderar</a>
          </div>
        </div>
      </div>
    </div>
    </template>
      
      <script>
      export default {
        props: {
          name: {
            type: String,
            required: true,
          },
         d: {
            type: String,
            required: true,
          },
          a: {
            type: String,
            required: true,
          },
          b: {
            type: String,
            required: true,
          },
          c: {
            type: String,
            required: true,
          },
          e: {
            type: String,
            required: true,
          },
        },
        methods:{
            JhessPayasita(){
                alert("PAYASA");
            }
        }
      };
      </script>
      
    <style scoped>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;800&display=swap");
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }
    
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      min-height: 100vh;
      background: #232427;
    }
    
    body .container {
      display: flex;
    
      flex-wrap: wrap;
      max-width: 100%;
    
    }
    
    body .container .card {
      position: relative;
      height: 320px;
      min-width: 400px;
      width: 100%;
      box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.2),
        inset -5px -5px 15px rgba(255, 255, 255, 0.1),
        5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.1);
      border-radius: 15px;
     transition: 0.5s;
     margin-right: 10px;
     margin-bottom: 20px;
    }
    
    body .container .card:nth-child(2) .box .content a {
      background: #2196f3;
    }
    
    body .container .card:nth-child(1) .box .content a {
      background: #e91e1e;
    }
    
    body .container .card:nth-child(3) .box .content a {
      background: #23c186;
    }
    
    body .container .card .box {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      background: rgb(0, 5, 1);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      transition: 0.5s;
    }
    
    body .container .card .box:hover {
      transform: translateY(-50px);
      background: #7bcd7b;
    
    }
    .dark-then body .container .card .box {
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      background: rgb(0, 5, 1);
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      transition: 0.5s;
    }
    
    body .container .card .box:hover {
      transform: translateY(-50px);
      background: #7bcd7b;
    
    }
    
    body .container .card .box:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      background: rgba(255, 255, 255, 0.03);
    }
    
    
    
    body .container .card .box .content {
      padding: 20px;
      text-align: center;
    }
    
    body .container .card .box .content h2 {
      position: absolute;
      top: -10px;
      left: 5px;
      font-size: 8rem;
      color: rgba(255, 255, 255, 0.1);
    }
    
    body .container .card .box .content h3 {
      font-size: 1.8rem;
      color: rgb(255, 255, 255);
      z-index: 1;
      transition: 0.5s;
      margin-bottom: 15px;
    }
    
    body .container .card .box .content h2 p:hover{
      
      color: rgba(255, 255, 255, 0.1);
    }
    
    body .container .card .box .content h3:hover {
     
      color: #9e4747;
     
    }
    
    
    body .container .card .box .content p {
      font-size: 1rem;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.9);
      z-index: 1;
      transition: 0.5s;
    }
    
    body .container .card .box .content a {
      position: relative;
      display: inline-block;
      padding: 8px 20px;
      background: rgb(8, 8, 184);
      border-radius: 5px;
      text-decoration: none;
      color: rgb(0, 0, 0);
      margin-top: 20px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      transition: 0.5s;
    }
    body .container .card .box .content a:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
      background: #30cd04;
      color: #ffffff;
    }
    
    @media screen and (max-width: 939px){
      body .container .card {
      position: relative;
      height: 320px;
      min-width: 240px;
     margin-top: 10px;
    }
       
     }
    
     @media screen and (max-width: 589px){
      body .container .card {
      position: relative;
      height: 220px;
      min-width: 400px;
     transition: 0.5s;
     margin-top: 10px;
    }
       
     }
    
    @media screen and (max-width: 480px){
      body .container .card {
      position: relative;
      height: 220px;
      min-width: 300px;
    
    
    }
       
     }
     @media screen and (max-width: 366px){
      body .container .card {
      position:relative;
      height: 300px;
      min-width: 220px;
    }
       
     }
    
      </style>