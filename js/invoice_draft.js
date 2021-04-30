let invoice = JSON.parse(`Джули, [30.04.21 19:02]
{
  "items": [
    {
      "name": "KROK course",
      "description": "Online KROK video course with themes, schemes and notes. Tests control of each theme added.",
      "quantity": "1",
      "unit_amount": {
        "currency_code": "USD",
        "value": "90.00"
      },
      "unit_of_measure": "QUANTITY"
    }
  ],
  "detail": {
    "invoice_number": "#123",
    "invoice_date": "2018-11-12",
    "currency_code": "USD",
    "note": "Thank you for your payment.",
    "term": "No refunds after 24 hours.",
    "payment_term": {
      "term_type": "DUE_ON_DATE_SPECIFIED",
      "due_date": "2018-05-15"
    }
  },
  "invoicer": {
    "name": {
      "given_name": "Vikas Chandra",
      "surname": "Tiwari"
    },
    "address": {
      "address_line_1": "208b, Alopibagh",
      "address_line_2": "Sohabatiya Bagh",
      "admin_area_2": "Prayagraj",
      "admin_area_1": "Uttar Pradesh",
      "postal_code": "211006",
      "country_code": "IN"
    },
    "email_address": "my.krok.tutor@gmail.com",
    "phones": [
      {
        "country_code": "+91",
        "national_number": "8172965339",
        "phone_type": "MOBILE"
      }
    ],
    "website": "https://my-krok-tutor.github.io/",
    "logo_url": "https://example.com/logo.PNG"
  },
  "primary_recipients": [
    {
      "billing_info": {
        "name": {
          "given_name": "Stephanie",
          "surname": "Meyers"
        },
        "email_address": "bill-me@example.com",
        "phones": [
          {
            "country_code": "001",
            "national_number": "4884551234",
            "phone_type": "MOBILE"
          }
        ]
      }
    }
  ],
  "configuration": {
    "partial_payment": {
      "allow_partial_payment": false,
      "minimum_amount_due": {
        "currency_code": "USD",
        "value": "20.00"
      }
    },
    "allow_tip": true,
    "tax_calculated_after_discount": true,
    "tax_inclusive": true,
    "template_id": "TEMP-19V05281TU309413B"
  },
  "amount": {
    "value": "90",
    "currency_code": "USD",
    "breakdown": {}
  }
}`);