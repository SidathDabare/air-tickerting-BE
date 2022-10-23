/** @format */

import mongoose from "mongoose"

const { Schema, model } = mongoose

const ordersSchema = new Schema(
  {
    data: {
      type: { type: String },
      id: { type: String },
      queuingOfficeId: { type: String },
      associatedRecords: [
        {
          reference: { type: String },
          creationDate: { type: String },
          originSystemCode: { type: String },
          flightOfferId: { type: String },
        },
      ],
      flightOffers: [
        {
          type: { type: String },
          id: { type: String },
          source: { type: String },
          nonHomogeneous: { type: Boolean },
          lastTicketingDate: { type: String },
          itineraries: [
            {
              segments: [
                {
                  departure: {
                    iataCode: { type: String },
                    at: { type: String },
                  },
                  arrival: {
                    iataCode: { type: String },
                    at: { type: String },
                  },
                  carrierCode: { type: String },
                  number: { type: String },
                  aircraft: {
                    code: { type: String },
                  },
                  duration: { type: String },
                  id: { type: String },
                  numberOfStops: { type: Number },
                  co2Emissions: [
                    {
                      weight: { type: Number },
                      weightUnit: { type: String },
                      cabin: { type: String },
                    },
                  ],
                },
              ],
            },
            // {
            //   segments: [
            //     {
            //       departure: {
            //         iataCode: { type: String },
            //         at: { type: String },
            //       },
            //       arrival: {
            //         iataCode: { type: String },
            //         at: { type: String },
            //       },
            //       carrierCode: { type: String },
            //       number: { type: String },
            //       aircraft: {
            //         code: { type: String },
            //       },
            //       duration: { type: String },
            //       id: { type: String },
            //       numberOfStops: { type: Boolean },
            //       co2Emissions: [
            //         {
            //           weight: { type: Number },
            //           weightUnit: { type: String },
            //           cabin: { type: String },
            //         },
            //       ],
            //     },
            //   ],
            // },
          ],
          price: {
            currency: { type: String },
            total: { type: String },
            base: { type: String },
            fees: [
              {
                amount: { type: String },
                type: { type: String },
              },
            ],
            grandTotal: { type: String },
            billingCurrency: { type: String },
          },
          pricingOptions: {
            fareType: [{ type: String }],
            includedCheckedBagsOnly: { type: Boolean },
          },
          validatingAirlineCodes: [{ type: String }],
          travelerPricings: [
            {
              travelerId: { type: String },
              fareOption: { type: String },
              travelerType: { type: String },
              price: {
                currency: { type: String },
                total: { type: String },
                base: { type: String },
                taxes: [
                  {
                    amount: { type: String },
                    code: { type: String },
                  },
                ],
                refundableTaxes: { type: String },
              },
              fareDetailsBySegment: [
                {
                  segmentId: { type: String },
                  cabin: { type: String },
                  fareBasis: { type: String },
                  brandedFare: { type: String },
                  class: { type: String },
                  includedCheckedBags: {
                    quantity: { type: Number },
                  },
                },
              ],
            },
          ],
        },
      ],
      travelers: [
        {
          id: { type: String },
          dateOfBirth: { type: String },
          gender: { type: String },
          name: {
            firstName: { type: String },
            lastName: { type: String },
          },
          documents: [
            {
              number: { type: String },
              issuanceDate: { type: String },
              expiryDate: { type: String },
              issuanceCountry: { type: String },
              issuanceLocation: { type: String },
              nationality: { type: String },
              birthPlace: { type: String },
              documentType: { type: String },
              holder: { type: Boolean },
            },
          ],
          contact: {
            purpose: { type: String },
            phones: [
              {
                deviceType: { type: String },
                countryCallingCode: { type: String },
                number: { type: String },
              },
            ],
            emailAddress: { type: String },
          },
        },
      ],
      remarks: {
        general: [
          {
            subType: { type: String },
            text: { type: String },
          },
        ],
      },
      ticketingAgreement: {
        option: { type: String },
        delay: { type: String },
      },
      automatedProcess: [
        {
          code: { type: String },
          queue: {
            number: { type: String },
            category: { type: String },
          },
          officeId: { type: String },
        },
      ],
      contacts: [
        {
          addresseeName: {
            firstName: { type: String },
          },
          address: {
            lines: [{ type: String }],
            postalCode: { type: String },
            countryCode: { type: String },
            cityName: { type: String },
          },
          purpose: { type: String },
          phones: [
            {
              deviceType: { type: String },
              countryCallingCode: { type: String },
              number: { type: String },
            },
            {
              deviceType: { type: String },
              countryCallingCode: { type: String },
              number: { type: String },
            },
          ],
          companyName: { type: String },
          emailAddress: { type: String },
        },
      ],
    },

    dictionaries: { type: Object },
    // dictionaries: {
    //   locations: {
    //     BOM: {
    //       cityCode: { type: String },
    //       countryCode: { type: String },
    //     },
    //     FRA: {
    //       cityCode: { type: String },
    //       countryCode: { type: String },
    //     },
    //     LHR: {
    //       cityCode: { type: String },
    //       countryCode: { type: String },
    //     },
    //     CMB: {
    //       cityCode: { type: String },
    //       countryCode: { type: String },
    //     },
    //     BLR: {
    //       cityCode: { type: String },
    //       countryCode: { type: String },
    //     },
    //   },
    // },
  },
  {
    timestamps: true,
  }
)

export default model("Order", ordersSchema)
