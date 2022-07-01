import { userModel } from '../db';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

class UserService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel) {
    this.userModel = userModel;
  }

  //  async emailCheck(email){
  //    console.log("!!!! 여기냐")
  //    const user = await this.userModel.findByEmail(email);
  //    console.log(user)
  //    return user;
    

  //  }

  // 회원가입
  async addUser(userInfo) {
    // 객체 destructuring
    console.log(userInfo)
    const { email, password } = userInfo;
    console.log(email);
    console.log(password)

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);

    
      if (user) {
        
         throw new Error(
            '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.'
         );
      }
       
    
      
    // 이메일 중복은 이제 아니므로, 회원가입을 진행함

    // 우선 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {  email, password: hashedPassword,  };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
      
    
     

  }

  // 로그인
  async getUserToken(loginInfo) {
    // 객체 destructuring
    const { email, password } = loginInfo;
    console.log(email)

    // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인

    
    const user = await this.userModel.findByEmail(email);
    if (!user){
      return ('해당 이메일은 가입 내역이 없습니다 다시 한 번 확인해 주세요 ')
    }
  

    // if (!user) {
    //   throw new Error(
    //     '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.'
    //   );
    // }

    // 이제 이메일은 문제 없는 경우이므로, 비밀번호를 확인함

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있떤 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
        if(!isPasswordCorrect){
          return ('비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요')
        }
    // if (!isPasswordCorrect) {
    //   throw new Error(
    //     '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
    //   );
    // }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';

    // 2개 프로퍼티를 jwt 토큰에 담음
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey);
    console.log(token)

    return { token, role: user.role };
  }
//유저 안에 좋아요 누르기 
async saveLike(productId,userId){
  const like = {like:productId.productId}
  console.log(like)
    const saveLike= await this.userModel.createLike(like,userId);
    return saveLike;
}





  // 사용자 목록을 받음.
  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );
    }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  async delteUser(userId, currentPassword) {
    let user = await this.userModel.findById(userId);
    // console.log(userId);
    // 유저 비밀번호 가지고 옴 
    const correctPasswordHash = user.password; // 유저 패스워드를  찾음 
    //비밀번호가 맞는지 한번 확인해본다.
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash
    );


    if (isPasswordCorrect) {// 맞으면 삭제해주고 아니면 경고 
      const userEmail = user.email;
      // 만일 패스워드랑 db패스워드랑 맞으면 유저를 삭제해준다.
      const deltEmail = await this.userModel.delete(userEmail);
      return deltEmail;

    } else {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.'
      );

    }

  }

  async basicUserInfo(userId) {
    const basicUserInfo = await this.userModel.findById(userId);
    return basicUserInfo;
  }

  /////////////////////////////////////기능 추가/////////////////////////////////////

  async updateUser(userId, paymentData) {
    const user = await this.userModel.updatePaymentData(userId, paymentData);
    return user;
  }

  async resetPassword(email) {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    const userId = user._id;

    const resetPassword = Math.floor(Math.random() * (10 ** 8)).toString();
    const hashedResetPassword = await bcrypt.hash(resetPassword, 10);

    const userToResetPassword = await this.userModel.updateResetPassword(userId, hashedResetPassword);

    //바뀐 비밀번호 메일 보내기
    const transporter = new nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'seogyeonghwan48@gmail.com',
        pass: 'sddeyoazcwavbtli',
      }
    });

    transporter.sendMail({
      from: "seogyeonghwan48@gmail.com",
      to: email,
      subject: "SHOPAHOLIC 임시 비밀번호",
      text: `SHOPAHOLIC 에서 발급된 임시 비밀번호는 ${resetPassword} 입니다.`,
    });

    return userToResetPassword;
  }

  /////////////////////////////////////기능 추가/////////////////////////////////////

  //관리자가 회원 삭제하는거 
  async adminDelteUser(userId) {
    const adminDeluser = await this.userModel.adminDelete(userId);
    return adminDeluser;
  }

  //관리자 role update하는 거 
  async adminRoleUpdate(userId, role) {
    const update = { role: role };
    const adminRoleUpdate = await this.userModel.roleUpdate(userId, update);
    return adminRoleUpdate;
  }

}

const userService = new UserService(userModel);

export { userService };
