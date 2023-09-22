const getContent = (from, data) => {
  return `<body style="background-color: #a7a7aa; height: fit-content; padding: 1em">
      <div style="padding: 1em 2em 1em 2em">
        <h2
          style="
            text-align: center;
            margin: 10px 0 10px 0;
            font-size: x-large;
            color: #000000;
          "
        >
          GREEN FARM
        </h2>
      </div>

      <div style="background-color: white; padding: 1em 2em 1em 2em">
          <h4>Hi ${data.Name},</h4>
           <p style="line-height: 1.3; font-size: medium">
           Congratulations your account was created with the following details:
          </p>
          <h4>
            <b>Name: </b> ${data.Name}
          </h4>
           <h4>
            <b>Email: </b> ${data.Email}
          </h4>
           <h4>
            <b>Phone: </b> ${data.Phone}
          </h4>
            <h4>
            <b>Default Password: </b> 123456
          </h4>
    <b> From: </b><span>${from}</span>
    </div>
  </body>`;
};

exports.getContent = getContent;
