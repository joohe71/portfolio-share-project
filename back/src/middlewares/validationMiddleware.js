const { body, validationResult } = require("express-validator");

const isValidData = (type) => {
  switch (type) {
    case 'education':
      return ( 
        [ 
          body("school", "학교 정보가 없습니다.").exists().isString(),
          body("major", "학과 정보가 없습니다.").exists().isString(),
          body("position", "position 정보가 없습니다.").exists().isIn(['재학중', '학사졸업', '석사졸업', '박사졸업'])
        ]
      );
    case 'award':
      return (
          [
            body("title", "수상명이 없습니다.").exists().isString(),
            body("description", "수상 설명이 없습니다.").exists().isString()
          ]
      );
  }   
}

const invalidCallback = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map((e) => e.msg) });
  }

  next();
}

module.exports = { isValidData , invalidCallback };