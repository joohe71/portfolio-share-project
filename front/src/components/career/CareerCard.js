import { Row, Col, Container, Card, Button, ButtonGroup, Modal } from "react-bootstrap";
import { useState } from 'react';
import CareerEditForm from './CareerEditForm';

// 학력 정보 조회 상세 값 컴포넌트
const CareerCard = ({ value, editHandler, deleteHandler, isEditable }) => {
  const { id, school, major, position } = value;
  const [isEditing, SetIsEditing] = useState(false);
  const [show, setShow] = useState(false)

  // 수정 form show 및 hide 처리용 함수
  const updateHandler = () => {
    SetIsEditing(!isEditing);
  };

  // 삭제 처리 함수(Education 컴포넌트에서 받아온 delete 요청 함수 사용)
  const handleDelete = (e) => {
    e.preventDefault();
    deleteHandler(id, e.target.value);
    setShow(false)
  };


  // 로그인 유저는 자신의 페이지만 추가/편집/삭제 가능  
  return (
    isEditing ?
      <CareerEditForm
        item={value}
        editHandler={editHandler}
        onUpdate={updateHandler} /> :
      <Container style={{padding: 10, margin:"10px 0", borderBottom: "rgba(70, 65, 65, 0.2) dotted"}}>
        <Row>
          <Col sm={10} style={{margin:"auto"}}>
            <Card.Subtitle>{school}</Card.Subtitle>
            <Card.Text className="text-muted">{major + ` (${position})`}</Card.Text>
          </Col>

          {isEditable ?
            <Col sm={2}>
              <ButtonGroup style={{ margin: 10, }} size='sm'>
                <Button variant="outline-info" onClick={updateHandler}>
                  <span class="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>edit</span>
                </Button>
                <Button variant="outline-danger" onClick={() => setShow(true)}>
                  <span class="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>delete</span>
                </Button>
              </ButtonGroup>
              <Modal show={show}>
              <Modal.Header>
              <Modal.Title>해당 내용을 삭제하시겠습니까?</Modal.Title>
              </Modal.Header>
              <br />
              <Modal.Footer style={{justifyContent:"center"}}>
              <Button variant="outline-danger" onClick={handleDelete}>
                  삭제
              </Button>
              <Button variant="outline-info" onClick={()=>setShow(false)}>
                    취소
                </Button>
              </Modal.Footer>
              </Modal>
            </Col> : <></>}
        </Row>
      </Container>
  );
};

export default CareerCard;