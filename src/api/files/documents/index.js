/** @format */

const module = ({ travelers, price1, price2, receiptId, companyName }) => {
  console.log(travelers)
  const today = new Date()
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
      integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
      crossorigin="anonymous"
    />

    <title>TICKET</title>
  </head>
  <style>
    body {
      background-color: black;
    }
    .main-container {
      width: 1000px;
      height: 2008px;
      background-color: antiquewhite;
      margin: 0 auto;
    }
    .main-inside-container {
      width: 97%;
      background-color: aqua;
      margin: 0 auto;
    }
     .passenger-details {
      display: flex;
      justify-content:space-beetween
    }
    .passenger-details div {
      width: 50%;
      height: 50px;
    } 
  </style>
  <body>
    <div class="main-container">
      <div class="main-inside-container">
        <div class="col-12 d-flex justify-content-end"><h3>BAR CODE</h3></div>
        <div class="passenger-details col-12 mx-auto bg-light d-flex">
          <div class="col-6">
            <div><h4>Passengers</h4></div>
            <div>
              ${travelers
                .map((traveler, i) => {
                  return `<small>${
                    traveler.name.firstName + " " + traveler.name.lastName
                  }</small></br>`
                })
                .join("")}
            </div>          
          </div>
          <div class="col-6">
            <small>Issued by / Date</small><br />
            <small>${companyName}</small>
          </div>
        </div>
        <div class="depature-details">
          <div><h4>Depature Details</h4></div>
          <div>
            <div>
              <h5>From VCE to FCO</h5>
              <small>Total duration 1h 10m</small>
            </div>
          </div>
        </div>
        <div class="arrival-details"></div>
        <div class="contact-details"></div>
      </div>
    </div>
  </body>
</html>`
  //   return `
  //     <!doctype html>
  //     <html>
  //        <head>
  //           <meta charset="utf-8">
  //           <title>PDF Result Template</title>
  //           <style>
  //              .invoice-box {
  //              max-width: 800px;
  //              margin: auto;
  //              padding: 30px;
  //              border: 1px solid #eee;
  //              box-shadow: 0 0 10px rgba(0, 0, 0, .15);
  //              font-size: 16px;
  //              line-height: 24px;
  //              font-family: 'Helvetica Neue', 'Helvetica',
  //              color: #555;
  //              }
  //              .margin-top {
  //              margin-top: 50px;
  //              }
  //              .justify-center {
  //              text-align: center;
  //              }
  //              .invoice-box table {
  //              width: 100%;
  //              line-height: inherit;
  //              text-align: left;
  //              }
  //              .invoice-box table td {
  //              padding: 5px;
  //              vertical-align: top;
  //              }
  //              .invoice-box table tr td:nth-child(2) {
  //              text-align: right;
  //              }
  //              .invoice-box table tr.top table td {
  //              padding-bottom: 20px;
  //              }
  //              .invoice-box table tr.top table td.title {
  //              font-size: 45px;
  //              line-height: 45px;
  //              color: #333;
  //              }
  //              .invoice-box table tr.information table td {
  //              padding-bottom: 40px;
  //              }
  //              .invoice-box table tr.heading td {
  //              background: #eee;
  //              border-bottom: 1px solid #ddd;
  //              font-weight: bold;
  //              }
  //              .invoice-box table tr.details td {
  //              padding-bottom: 20px;
  //              }
  //              .invoice-box table tr.item td {
  //              border-bottom: 1px solid #eee;
  //              }
  //              .invoice-box table tr.item.last td {
  //              border-bottom: none;
  //              }
  //              .invoice-box table tr.total td:nth-child(2) {
  //              border-top: 2px solid #eee;
  //              font-weight: bold;
  //              }
  //              @media only screen and (max-width: 600px) {
  //              .invoice-box table tr.top table td {
  //              width: 100%;
  //              display: block;
  //              text-align: center;
  //              }
  //              .invoice-box table tr.information table td {
  //              width: 100%;
  //              display: block;
  //              text-align: center;
  //              }
  //              }
  //           </style>
  //        </head>
  //        <body>
  //           <div class="invoice-box">
  //              <table cellpadding="0" cellspacing="0">
  //                 <tr class="top">
  //                    <td colspan="2">
  //                       <table>
  //                          <tr>
  //                             <td class="title"><img  src="https://i2.wp.com/cleverlogos.co/wp-content/uploads/2018/05/reciepthound_1.jpg?fit=800%2C600&ssl=1"
  //                                style="width:100%; max-width:156px;"></td>
  //                             <td>
  //                                Datum: ${`${today.getDate()}. ${
  //                                  today.getMonth() + 1
  //                                }. ${today.getFullYear()}.`}
  //                             </td>
  //                          </tr>
  //                       </table>
  //                    </td>
  //                 </tr>
  //                 <tr class="information">
  //                    <td colspan="2">
  //                       <table>
  //                          <tr>
  //                             <td>
  //                                Customer name: ${name}
  //                             </td>
  //                             <td>
  //                                Receipt number: ${receiptId}
  //                             </td>
  //                          </tr>
  //                       </table>
  //                    </td>
  //                 </tr>
  //                 <tr class="heading">
  //                    <td>Bought items:</td>
  //                    <td>Price</td>
  //                 </tr>
  //                 <tr class="item">
  //                    <td>First item:</td>
  //                    <td>${price1}$</td>
  //                 </tr>
  //                 <tr class="item">
  //                    <td>Second item:</td>
  //                    <td>${price2}$</td>
  //                 </tr>
  //              </table>
  //              <br />
  //              <h1 class="justify-center">Total price: ${
  //                parseInt(price1) + parseInt(price2)
  //              }$</h1>
  //           </div>
  //        </body>
  //     </html>
  //     `
}

export default module
