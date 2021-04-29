let invoice = JSON.parse(`{
    "detail": {
      "invoice_number": "#12345",
      "reference": "deal-ref",
      "currency_code": "USD",
      "note": "Thank you for your business.",
      "term": "No refunds after 30 days.",
      "memo": "This is a long contract",
      "payment_term": {
        "term_type": "NET_10"
      }
    },
    "invoicer": {
      "name": {
        "given_name": "Vikas Chandra",
        "surname": "Tiwari"
      },
      "address": {
        "address_line_1": "1234 First Street",
        "admin_area_2": "Anytown",
        "admin_area_1": "UP",
        "postal_code": "211006",
        "country_code": "IN"
      },
      "phones": [{
        "country_code": "+91",
        "national_number": "4085551234",
        "phone_type": "MOBILE"
      }],
      "website": "my-krok-tutor.github.io/index.html",
      "tax_id": "ABcNkWSfb5ICTt73nD3QON1fnnpgNKBy- Jb5SeuGj185MNNw6g",
      "logo_url": "https://example.com/logo.png",
      "additional_notes": "2-4"
    },
    "primary_recipients": [{
      "billing_info": {
        "name": {
          "given_name": "Vikas Chandra",
          "surname": "Tiwari"
        },
        "address": {
          "address_line_1": "1234 Main Street",
          "admin_area_2": "Anytown",
          "admin_area_1": "CA",
          "postal_code": "98765",
          "country_code": "US"
        },
        "email_address": "my.krok.tutor@gmail.com",
        "phones": [{
          "country_code": "+91",
          "national_number": "4884551234",
          "phone_type": "MOBILE"
        }],
        "additional_info_value": "add-info"
      },
      "shipping_info": {
        "name": {
          "given_name": "Vikas Chandra",
          "surname": "Tiwari"
        },
        "address": {
          "address_line_1": "1234 Main Street",
          "admin_area_2": "Anytown",
          "admin_area_1": "CA",
          "postal_code": "98765",
          "country_code": "IN"
        }
      }
    }],
    "items": [{
      "name": "KROK Courses",
      "description": "KROK preparation courses for Indian students.",
      "quantity": "1",
      "unit_amount": {
        "currency_code": "USD",
        "value": "90.00"
      },
      "tax": {
        "name": "Sales Tax",
        "percent": "0.00"
      },
      "discount": {
        "percent": "5"
      },
      "unit_of_measure": "QUANTITY"
    }],
    "configuration": {
      "partial_payment": {
        "allow_partial_payment": true,
        "minimum_amount_due": {
          "currency_code": "USD",
          "value": "90.00"
        }
      },
      "allow_tip": true,
      "tax_calculated_after_discount": true,
      "tax_inclusive": false
    },
    "amount": {
      "breakdown": {
        "custom": {
          "label": "Packing Charges",
          "amount": {
            "currency_code": "USD",
            "value": "10.00"
          }
        },
        "shipping": {
          "amount": {
            "currency_code": "USD",
            "value": "10.00"
          },
          "tax": {
            "name": "Sales Tax",
            "percent": "0.00"
          }
        },
        "discount": {
          "invoice_discount": {
            "percent": "5"
          }
        }
      }
    }
  }`);