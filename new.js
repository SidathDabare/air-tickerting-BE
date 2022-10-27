/** @format */

;`<div class='arrival-details'>
  <div
    style='
              width: 100%;
              margin: 5px auto;
              padding: 5px 5px;
              background-color: rgb(198, 228, 254);
            '>
    <h4>
      Arrival Details $
      {getDate(data.flightOffers[0].itineraries[1].segments[1].departure.at)}
    </h4>
  </div>
  <table style='width: 95%; margin: 0 auto'>
    <tr>
      <td colspan='2'>
        <h5>
          <span>From</span>
          <span>
            $
            {data.flightOffers[0].itineraries[1].segments[0].departure.iataCode}
          </span>
          <span>to </span>
          <span>
            $
            {
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
