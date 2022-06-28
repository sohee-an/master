// api 로 GET 요청 (/endpoint/params 형태로 요청함)
async function get(endpoint, params = '') {
    const apiUrl = `${endpoint}/${params}`;
    console.log(`%cGET 요청: ${apiUrl} `, 'color: #a25cd1;');
  
    const res = await fetch(apiUrl, {
      // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    // 응답 코드가 4XX 계열일 때 (400, 403 등)
    if (!res.ok) {
      const errorContent = await res.json();
      const { reason } = errorContent;
  
      throw new Error(reason);
    }
  
    const result = await res.json();
  
    return result;
  }
  
  // api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
  async function post(endpoint, data) {
    const apiUrl = endpoint;
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cPOST 요청: ${apiUrl}`, 'color: #296aba;');
    console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');
  
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: bodyData,
    });
  
    // 응답 코드가 4XX 계열일 때 (400, 403 등)
    if (!res.ok) {
      const errorContent = await res.json();
      const { reason } = errorContent;
  
      throw new Error(reason);
    }
  
    const result = await res.json();
  
    return result;
  }
  
  // api 로 PATCH 요청 (/endpoint/params 로, JSON 데이터 형태로 요청함)
  async function patch(endpoint, params = '', data) {
    const apiUrl = `${endpoint}/${params}`;
  
    // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
    // 예시: {name: "Kim"} => {"name": "Kim"}
    const bodyData = JSON.stringify(data);
    console.log(`%cPATCH 요청: ${apiUrl}`, 'color: #059c4b;');
    console.log(`%cPATCH 요청 데이터: ${bodyData}`, 'color: #059c4b;');
  
    const res = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: bodyData,
    });
  
    // 응답 코드가 4XX 계열일 때 (400, 403 등)
    if (!res.ok) {
      const errorContent = await res.json();
      const { reason } = errorContent;
  
      throw new Error(reason);
    }
  
    const result = await res.json();
  
    return result;
  }
  
  // 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
  // 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
  async function del(endpoint, params = '', data = {}) {
    const apiUrl = `${endpoint}/${params}`;
    const bodyData = JSON.stringify(data);
  
    console.log(`DELETE 요청 ${apiUrl}`);
    console.log(`DELETE 요청 데이터: ${bodyData}`);
  
    const res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: bodyData,
    });
  
    // 응답 코드가 4XX 계열일 때 (400, 403 등)
    if (!res.ok) {
      const errorContent = await res.json();
      const { reason } = errorContent;
      console.log(reason);
  
      throw new Error(reason);
    }
  
    const result = await res.json();
  
    return result;
  }
  
  // 아래처럼 export하면, import * as Api 로 할 시 Api.get, Api.post 등으로 쓸 수 있음.
  export { get, post, patch, del as delete };
  
  // 상품 아이디로 상품 가져오기
  export const getProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.data.message);
      }
      return response.json();
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
  };
  
  // 상품에 대한 전체 리뷰와 평균 평점
  export const getTotalReviewData = async (id) => {
    try {
      const response = await fetch(`/api/reviews/reviewRating/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.data.message)
      }
      return response.json();
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message }
    }
  }
  
  // 개별 상품에 코멘트한 유저이름, 코멘트내용, 개별별점 (배열 안의 객체)
  export const getProductReview = async (id) => {
    try {
      const response = await fetch(`/api/reviews/productReview/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(response.data.message)
      }
      return response.json();
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message }
    }
  }