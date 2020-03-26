const apiInstance = axios.create({
  baseURL: "your_server_url",
  headers: { "Content-Type": "application/json" }
});

// Sending code to the backend
const authSend = data => {
  const payload = {
    code: data.code
  };

  apiInstance
    .post("/auth", payload)
    .then(response => {
      console.log(response.data);
      botList();

      document.getElementById("livechat-login-button").style.display = "none";
      document.querySelector(".authorization").innerHTML = "Authorized!";
      document.getElementById("livechat-authorization-done").style.display =
        "block";
      document.querySelector(".authorization-done").innerHTML =
        "Your email address: " + data.entity_id;
    })
    .catch(error => {
      console.log(error);
    });
};

// Getting list of bots
const botList = () => {
  const payload = {
  };

  apiInstance
    .post("/bot_list", payload)
    .then(response => {
      console.log(response.data);
      bot_list = response.data;

      const listArray = bot_list;
      const list = document.querySelector(".bot-list");
      const listItems = listArray.map(element => {
        return `
          <li id='${element.id} 'class='listItem' style="display: flex; margin-bottom: 10px;align-items: center;">
              <img src="${element.avatar}" style="width: 48px; height: 48px; border-radius: 50%;"/>

              <div style="display: flex; flex-direction: column; padding: 10px; width: 280px;">
                  <strong>${element.name}</strong>
                  <span>${element.id}</span>
              </div>

              <div>
                  <button id='${element.id}' class="lc-btn lc-btn--compact btn-select" onclick="botSelect('${element.id}')">Select</button>
                  <button class="lc-btn lc-btn--destructive lc-btn--compact" onclick="botRemove('${element.id}')">&times;</button>
              </div>
          </li>`;
      });

      list.innerHTML = listItems.join("");
    })
    .catch(error => {
      console.log(error);
    });
};

// Creating new bot
const botCreate = () => {
  const botName = document.getElementsByName("BotName")[0].value;

  const payload = {
    botName
  };

  apiInstance
    .post("/bot_create", payload)
    .then(response => {
      console.log(response.data);
      botList();
    })
    .catch(error => {
      console.log(error);
    });
};

// Selecting bot
const botSelect = data => {
  const elems = document.querySelectorAll(".btn-select");
  [].forEach.call(elems, function(el) {
    el.classList.remove("lc-btn--primary");
  });

  const payload = {
    botNumber: data
  };

  apiInstance
    .post("/bot_select", payload)
    .then(response => {
      console.log(response.data);
      document.getElementById(data).classList.add("lc-btn--primary");
    })
    .catch(error => {
      console.log(error);
    });
};

// Removing bot
const botRemove = data => {
  const payload = {
    botNumber: data
  };

  apiInstance
    .post("/bot_remove", payload)
    .then(response => {
      console.log(response.data);
      botList();
    })
    .catch(error => {
      console.log(error);
    });
};
