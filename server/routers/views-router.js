import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

//서버 이미지를 사용하기 위한 라우터
viewsRouter.use('/uploads', express.static('uploads'))

// 페이지별로 html, css, js 파일들을 라우팅함
// 아래와 같이 하면, http://localhost:5000/ 에서는 views/home/home.html 파일을,
// http://localhost:5000/register 에서는 views/register/register.html 파일을 화면에 띄움
viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/home', serveStatic('home'));
viewsRouter.use('/register', serveStatic('register'));
viewsRouter.use('/login', serveStatic('login'));

viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/order', serveStatic('order'));
viewsRouter.use('/order/complete', serveStatic('order-complete'))
viewsRouter.use('/order/history', serveStatic('order-history'))
viewsRouter.use('/users', serveStatic('user'))
viewsRouter.use('/users/update', serveStatic('user-update'))
viewsRouter.use('/users/delete', serveStatic('user-delete'))
viewsRouter.use('/admin', serveStatic('admin'))
viewsRouter.use('/admin/users', serveStatic('admin-users'))
viewsRouter.use('/admin/orders', serveStatic('admin-orders'))


viewsRouter.use('/products', serveStatic('products'));
viewsRouter.use('/product/add', serveStatic('product-add'))
viewsRouter.use('/category/add', serveStatic('category-add'))
viewsRouter.use('/product/update', serveStatic('product-update'))
viewsRouter.use('/category/update', serveStatic('category-update'))
viewsRouter.use('/account/password', serveStatic('password-find'))
viewsRouter.use('/login/temporary', serveStatic('login-temporary'))

//viewsRouter.use('/reviews',serveStatic('reviews'))




// views 폴더의 최상단 파일인 rabbit.png, api.js 등을 쓸 수 있게 함
viewsRouter.use('/', serveStatic(''));

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../../client/src/views/${resource}`);
  const option = { index: `${resource}.html` };

  // express.static 은 express 가 기본으로 제공하는 함수임
  return express.static(resourcePath, option);
}

export { viewsRouter };
