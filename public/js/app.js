console.log("This is from javascript")
const input = document.querySelector("input");
const msg1 = document.querySelector("#message1");
const msg2 = document.querySelector("#message2");
document.querySelector("button").addEventListener("click", (e) => {
    e.preventDefault();
    msg1.textContent = "Loading...";
    msg2.textContent = null;
    fetch("/weather?address=" + input.value).then((response) => {
        response.json().then(data => {
            if(data.error){
                msg1.innerHTML = data.error;
                return;
            }
            msg1.textContent = data.placeName;
            msg2.textContent = data.forecast;
        });
    });
})