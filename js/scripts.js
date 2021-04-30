console.log('hello!');
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ASicX0PcP6JEVstyWCv3Av09gZRmWFWx381sU17MmMwUAj1wfr5XtaR3koM3BL7fqRbO11hjodpMUTFf:EBIj49PZRk6Fcr1w-bpOHu8IMlbIE5QjsiVM7MXU4JstoRyxi7QbbxjBJch1CBvEt2mLKeqX-dk4Jce7'
      },
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

function getNextNumber(){
    postData('https://api-m.sandbox.paypal.com/v2/invoicing/generate-next-invoice-number', { })
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
    });
}
  