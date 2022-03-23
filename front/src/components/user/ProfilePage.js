import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});

  const portfolioOwnerId = params.userId;

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);


  const withdrawal = async () => {
    // 회원탈퇴 확인창
    alert(`${user.name}님, 회원탈퇴가 완료되었습니다.`);

    // 해당 유저의 학력, 수상이력, 프로젝트, 자격증 삭제
    await Api.delete(`educationlist/${user.id}`);
    await Api.delete(`awardlist/${user.id}`);
    await Api.delete(`projectlist/${user.id}`);
    await Api.delete(`certificatelist/${user.id}`);

    // 해당 유저 DELETE 요청 처리
    await Api.delete(`users/${user.id}`);
    // 로그인 페이지로 돌아감
    navigate("/login");
  };

  return (
    <div className="profilePage">
      <div className="profileCard">
        <Card
          className="mb-2 ms-3 mr-5" 
          style={{ width: "18rem" }}
        >
          <Card.Body>
            <Row className="justify-content-md-center">
              <Card.Img
                style={{ width: "10rem", height: "8rem" }}
                className="mb-3"
                src="http://placekitten.com/200/200"
                alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
              />
            </Row>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
            <Card.Text>{user?.description}</Card.Text>
            <Card.Text><a href={user?.github} style={{color: "black", textDecoration: "none"}}><i className="fa-brands fa-github"></i> {user?.github}</a></Card.Text>
            <Card.Text><a href={user?.gitlab} style={{color: "black", textDecoration: "none"}}><i className="fa-brands fa-gitlab"></i> {user?.gitlab}</a></Card.Text>
            <Card.Text><a href={user?.twitter} style={{color: "black", textDecoration: "none"}}><i className="fa-brands fa-twitter"></i> {user?.twitter}</a></Card.Text>
            <Card.Text><a href={user?.instagram} style={{color: "black", textDecoration: "none"}}><i className="fa-brands fa-instagram"></i> {user?.instagram}</a></Card.Text>
            <Card.Text><a href={user?.youtube} style={{color: "black", textDecoration: "none"}}><i className="fa-brands fa-youtube"></i> {user?.youtube}</a></Card.Text>

            <Col>
              <Row className="mt-3 text-center text-info">
                  <Col sm={{ span: 20 }}>
                  <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={withdrawal}
                  >
                      회원탈퇴
                  </Button>
                  </Col>
              </Row>
            </Col>
          </Card.Body>
        </Card>
      </div>
      <div className="EditProfile">
        <h4>프로필 카드 설정</h4>
        <UserEditForm user={user} setUser={setUser} />
      </div>
    </div>
  );
}

function UserEditForm({ user, setUser }) {
  const [updateUser, setUpdateUser] = useState({});

  const [newPassword, setNewPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  useEffect(() => {
    setUpdateUser({
      name: "",
      description: "",
      github: "",
      gitlab: "",
      twitter: "",
      instagram: "",
      youtube: "",
    })
  },[user])

  useEffect(() => {
    if(isCorrectPassword){
     setUpdateUser({...updateUser, password:newPassword})
    }
  },[newPassword, isCorrectPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name: updateUser.name,
      description: updateUser.description,
      github: updateUser.github,
      gitlab: updateUser.gitlab,
      twitter: updateUser.twitter,
      instagram: updateUser.instagram,
      youtube: updateUser.youtube,
      password: updateUser.password
    });
    // 해당 유저 정보로 user을 세팅함.
    setUser(res.data);

    alert("프로필 정보가 수정되었습니다.");
  };

  return (
    <Card border="light">
      <Card.Body>
        <p>이름</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="userEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름을 입력하세요"
              onChange={(e) => setUpdateUser({...updateUser, name:e.target.value})}
            />
          </Form.Group>

          <p>이메일</p>
          <p style={{fontSize: '11px'}}>이메일은 변경 불가능합니다.</p>
          <Form.Group controlId="userEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder={user.email}
              disabled={true}
              className="mb-2"
            />
          </Form.Group>

          <p>소개</p>
          <Form.Group controlId="userEditDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="소개를 입력하세요"
              onChange={(e) => setUpdateUser({...updateUser, description:e.target.value})}
            />
          </Form.Group>

          <p>소셜 링크</p>
          <Form.Group controlId="userEditSocialLinkGitHub" className="mb-3">
            <Form.Control
              type="text"
              placeholder="GitHub 주소를 입력하세요"
              onChange={(e) => setUpdateUser({...updateUser, github:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="userEditSocialLinkGitLab" className="mb-3">
            <Form.Control
              type="text"
              placeholder="GitLab 주소를 입력하세요"
              className="mb-2"
              onChange={(e) => setUpdateUser({...updateUser, gitlab:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="userEditSocialLinkTwitter" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Twitter 주소를 입력하세요"
              className="mb-2"
              onChange={(e) => setUpdateUser({...updateUser, twitter:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="userEditSocialLinkInstagram" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Instagram 주소를 입력하세요"
              className="mb-2"
              onChange={(e) => setUpdateUser({...updateUser, instagram:e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="userEditSocialLinkYoutube" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Youtube 주소를 입력하세요"
              className="mb-2"
              onChange={(e) => setUpdateUser({...updateUser, youtube:e.target.value})}
            />
          </Form.Group>

          <p>비밀번호</p>
          {!isValidPassword && <p style={{fontSize: '11px', color:'red'}}>비밀번호는 4글자 이상이어야 합니다.</p>}
          <Form.Group controlId="checkPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"
              className="mb-2"
              onChange={(e) => {
                if(e.target.value.length >= 4){
                  setIsValidPassword(true);
                } else {
                  setIsValidPassword(false);
                }
                setNewPassword(e.target.value);
              }}
            />
          </Form.Group>
          <p>비밀번호 재확인</p>
          {isValidPassword && !isCorrectPassword && <p style={{fontSize: '11px', color:'red'}}>비밀번호가 일치하지 않습니다.</p>}
          <Form.Group controlId="userEditPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="비밀번호를 다시 한번 입력하세요"
              className="mb-2"
              onChange={(e) => {
                if(newPassword === e.target.value) {
                  setIsCorrectPassword(true)
                }else {
                  setIsCorrectPassword(false)
                }
              }}
              disabled={!isValidPassword}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3" disabled={!isCorrectPassword && newPassword}>
                설정 저장
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfilePage;