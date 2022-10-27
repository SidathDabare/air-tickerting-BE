/** @format */
import { format, parseISO } from "date-fns"

const module = ({ data }) => {
  console.log(data)

  // const dateTime = (str, type) => {
  //   return format(str, type)
  // }
  const getDate = (str) => {
    let date = str.slice(0, 10)
    return date
  }
  const getTime = (str) => {
    let numbers = str.slice(2, str.length).toLowerCase()
    let firstNumbers = numbers.slice(0, 2)
    let secondNumbers = numbers.slice(2, 4)
    //console.log(firstNumbers)
    return (
      firstNumbers +
      " " +
      (secondNumbers !== "" ? secondNumbers + "m" : secondNumbers + "00m")
    )
  }
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
      <title>PDF Result Template</title>
  </head>
    <style>
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }
    body {
      background-color: black;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
    .main-container {
      width: 1000px;
      height: 2008px;
      background-color: rgb(255, 255, 255);
      margin: 0 auto;
    }
    .main-inside-container {
      width: 97%;
      background-color: rgb(255, 255, 255);
      margin: 0 auto;
    }
    .gray-background {
      background-color: rgb(222, 222, 222);
    }
    .bar-code {
      text-align: right;
      width: 95%;
      margin: 0 auto;
    }
    .passenger-details {
      width: 100%;
      margin: 0 auto;
      display: flex;
      padding: 5px 0;
    }

    .booking-ref {
      width: 100%;
      padding: 5px 0 5px 10px;
      background-color: rgb(229, 240, 251);
    }
    .depature-details {
      width: 100%;
      background-color: aliceblue;
    }
    .arrival-details {
      width: 100%;
      background-color: aliceblue;
    }

    .single-line {
      width: 80px;
      height: 0.5px;
      background-color: rgb(197, 194, 194);
      margin:0 auto;
    }
    tr.border_bottom td {
      border-bottom: 0.3px solid grey;
    }
    td{
      width:140px;
    }
  </style>
  <body>
    <div class="main-container">
      <div class="main-inside-container">
        <div class="bar-code"><h3>BAR CODE</h3></div>
        <table style="width: 100%">
          <tr style="width: 100%">
            <th style="width: 50%; text-align: left">
              <h4 class="py-1">Passengers</h4>
            </th>
          </tr>
          <tr style="width: 100%">
            <td style="width: 50%; padding-left: 10px">
          ${data.travelers
            .map((traveler) => {
              return `<small>${
                traveler.name.firstName + " " + traveler.name.lastName
              }</small></br>`
            })
            .join("")}
            </td>
            <td style="width: 50%">
              <small>Issued by / Date</small><br />
              <small>
              ${data.contacts[0].companyName} /               
       
              ${getDate(data.associatedRecords[0].creationDate)}
              </small>
            </td>
          </tr>
        </table>
            <div class="booking-ref gray-background mb-1 pl-3">
          <h6 class="py-1">
            <span>Your booking reference </span>
            <span>${data.associatedRecords[0].reference}</span>
          </h6>
        </div>
        <div class="depature-details">
          <div
            style="
              width: 100%;
              margin: 5px auto;
              padding: 5px 5px;
              background-color: rgb(198, 228, 254);
            "
          >
            <h4>Depature Details ${getDate(
              data.flightOffers[0].itineraries[0].segments[0].departure.at
            )}</h4>
          </div>
          
          <table style="width: 95%; margin: 0 auto">
           <tr>
                <td colspan="2">
                  <h5>
                    <span>From</span>
                    <span>${
                      data.flightOffers[0].itineraries[0].segments[0].departure
                        .iataCode
                    }</span>
                    <span>to </span>
                    <span>${
                      data.flightOffers[0].itineraries[0].segments[
                        data.flightOffers[0].itineraries[0].segments.length - 1
                      ].arrival.iataCode
                    }</span>
                  </h5>               
                </td>
           
              </tr>
          </table>
          ${data.flightOffers[0].itineraries[0].segments.map((item) => {
            return `      
            <table style="width: 95%; margin: 3px auto">
            <tbody>
             
              <tr class="border_bottom">
                <td>
                  <p>${item.departure.iataCode}</p>
                  <h5>${getDate(item.departure.at)}</h5>
                </td>
                <td style="margin: 0 auto; text-align: center">
                  <div class="single-line"></div>
                </td>
                <td style="text-align: right">
                  <p>${item.arrival.iataCode}</p>
                  <h5>${getDate(item.arrival.at)}</h5>
                </td>

                <td style="text-align: right">
                  <div>
                    <img class='carrier-img-model'
                    src=https://content.airhex.com/content/logos/airlines_${
                      item.carrierCode
                    }_22_27_t.png?background=fffff
                    alt='' />
                  </div>
                </td>
                <td style="padding: 0 0 0 15px">
                  <small>Flight number</small>
                  <h6>${item.carrierCode}${item.number}</h6>
                </td>
                <td style="margin: 0 auto; text-align: center">
                    <small style="font-size:10px;margin:auto;">
                    Duration : ${getTime(item.duration)} 
                    </small>

                </td>
                <td style="text-align: right">
                  <small>Aircraft type</small>
                  <h6>Boeing 77</h6>
                </td>
              </tr>

            </tbody>
            </table>`
          })}

        </div>
  ${
    data.flightOffers[0].itineraries.length > 0 &&
    data.flightOffers[0].itineraries[1]
      ? `<div class='arrival-details'>
        <div
          style='
                    width: 100%;
                    margin: 5px auto;
                    padding: 5px 5px;
                    background-color: rgb(198, 228, 254);
                  '>
          <h4>
            Arrival Details ${getDate(
              data.flightOffers[0].itineraries[1].segments[1].departure.at
            )}
          </h4>
        </div>
        <table style='width: 95%; margin: 0 auto'>
          <tr>
            <td colspan='2'>
              <h5>
                <span>From</span>
                <span>
                  ${
                    data.flightOffers[0].itineraries[1].segments[0].departure
                      .iataCode
                  }
                </span>
                <span>to </span>
                <span>
                  ${
                    data.flightOffers[0].itineraries[1].segments[
                      data.flightOffers[0].itineraries[1].segments.length - 1
                    ].arrival.iataCode
                  }
                </span>
              </h5>
            </td>
          </tr>
        </table>
        ${data.flightOffers[0].itineraries[1].segments.map((item) => {
          return `      
                  <table style="width: 95%; margin: 3px auto">
                  <tbody>
                  
                    <tr class="border_bottom">
                      <td>
                        <p>${item.departure.iataCode}</p>
                        <h5>${format(parseISO(item.departure.at), "HH:mm")}</h5>
                      </td>
                      <td style="margin: 0 auto; text-align: center">
                        <div class="single-line"></div>
                      </td>
                      <td style="text-align: right">
                        <p>${item.arrival.iataCode}</p>
                        <h5>${format(parseISO(item.arrival.at), "HH:mm")}</h5>
                      </td>

                      <td style="text-align: right">
                        <div>
                          <img class='carrier-img-model'
                          src=https://content.airhex.com/content/logos/airlines_${
                            item.carrierCode
                          }_22_27_t.png?background=fffff
                          alt='' />
                        </div>
                      </td>
                      <td style="padding: 0 0 0 15px">
                        <small>Flight number</small>
                        <h6>${item.carrierCode}${item.number}</h6>
                      </td>
                      <td style="margin: 0 auto; text-align: center">
                          <small style="font-size:10px;margin:auto;">
                          Duration : ${getTime(item.duration)} 
                          </small>

                      </td>
                      <td style="text-align: right">
                        <small>Aircraft type</small>
                        <h6>Boeing 77</h6>
                      </td>
                    </tr>

                  </tbody>
                  </table>`
        })}
      </div>`
      : `<div>Only oneway</div>`
  }

       

         <div class="contact-details">
          <div
            style="
              width: 100%;
              margin: 5px auto;
              padding: 5px 5px;
              background-color: rgb(198, 228, 254);
            "
          >
            <h4>Fare infomation</h4>
          </div>
          <table style="width: 95%; margin: 0 auto">
            <tr>
              <td></td>
              <td style="text-align: right">
                <small>Total fare(Incl, TFC)</small><br />
                <small>
                ${data.flightOffers[0].price.currency}
                ${data.flightOffers[0].price.total} 
                </small>
              </td>
            </tr>
          </table>
        </div>

      </div>
    </div>
  </body>
</html>`
}

export default module
