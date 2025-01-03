// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "topbar"
import ThemeSwitch from "./hooks/themeSwitch"
import Copy from "./hooks/copy"
import WebShareApi from "./hooks/webShareApi"

// Set the theme on page load
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'night');

const Hooks = {
  ThemeSwitch,
  Copy,
  WebShareApi
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, { params: { _csrf_token: csrfToken }, hooks: Hooks })

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", _info => topbar.show(500))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

const text = " Kenneth!";
const typedTextElement = document.getElementById("typed-text");

function typeText() {
  for (let index = 0; index < text.length; index++) {
    setTimeout(() => {
      typedTextElement.textContent += text.charAt(index);
    }, (index + 1) * 200);
  }
}

const textElixir = " Elixir";
const typedTextElixirElement = document.getElementById("typed-text-elixir");

function typeTextElixir() {
  for (let index = 0; index < text.length; index++) {
    setTimeout(() => {
      typedTextElixirElement.textContent += textElixir.charAt(index);
    }, (index + 1) * 200 + 9 * 200);
  }
}

// window.addEventListener('load', () => {
//   typeText();
//   typeTextElixir();
//   sessionStorage.setItem('hasVisited', 'true');
// });
