// products.html과 연결
import { sidebar } from '../common/sidebar/sidebar.js';
import { changeNavbar, handleLogoutBtn } from "../common/navbar/navbar.js";
import Products_screen from "./products_screen.js";
import { parseRequestUrl } from './utils.js';
import ProductScreen from './screens/ProductScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import menScreen from './screens/menScreen.js';
import womenScreen from './screens/womenScreen.js';
import mensOuterScreen from './screens/mensOuterScreen.js';
import womensOuterScreen from './screens/womensOuterScreen.js';
import mensTopScreen from './screens/mensTopScreen.js';
import womensTopScreen from './screens/womensTopScreen.js';
import mensBottomScreen from './screens/mensBottomScreen.js';
import womensBottomScreen from './screens/womensBottomScreen.js';
import reviewScreen from './screens/reviewScreen.js';

sidebar();
changeNavbar();
handleLogoutBtn();

const routes = {
  "/": Products_screen,
  "/product/:id": ProductScreen,
  "/?lc=men": menScreen,
  "/?lc=women": womenScreen,
  "/?lc=men&mc=outer": mensOuterScreen,
  "/?lc=women&mc=outer": womensOuterScreen,
  "/?lc=men&mc=top": mensTopScreen,
  "/?lc=women&mc=top": womensTopScreen,
  "/?lc=men&mc=bottom": mensBottomScreen,
  "/?lc=women&mc=bottom": womensBottomScreen,
  "/reviews/:id": reviewScreen,
}



const router = async () => {
  const request = parseRequestUrl();
  console.log(request)
  const parseUrl = (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

  const main = document.getElementById("producItemContainer");
  main.innerHTML = await screen.render();
  await screen.after_render();
}
//페이지 로드 시
window.addEventListener('load', router);
window.addEventListener('hashchange', router);