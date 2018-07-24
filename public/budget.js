var recieveMessage = (event) => {
    if (event.origin !== "http://localhost:3000")
        return;
    console.log(event.source.location.href + " " + event.data);
}

window.addEventListener("load", function() {
    console.log("Web page has loaded");
    window.addEventListener("message", recieveMessage, false);
});

