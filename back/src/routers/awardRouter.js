import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
// create시 데이터 유효성 검사 middleware
import { isValidData, invalidCallback } from "../middlewares/validationMiddleware";
import { awardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

// POST: /award/create => 수상 내역 추가
awardRouter.post("/award/create", 
isValidData("award"),
invalidCallback,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
      }

      const { user_id, title, description } = req.body;
      console.log(title, description);
      const newAward = await awardService.addAward({ user_id, title, description });
      if (newAward.errorMessage) {
        throw new Error(newAward.errorMessage);
      }

      res.status(201).json(newAward);

    } catch (e) {
      next(e);
    }
});

// GET: /awards/:id => id에 해당하는 수상 내역 조회
awardRouter.get("/awards/:id", async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const award = await awardService.getAwardInfo({ award_id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).json(award);
  } catch (e) {
    next(e);
  };
});

// PUT: /awards/:id => id에 해당하는 수상 내역 업데이트
awardRouter.put("/awards/:id", async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    const updatedAward = await awardService.updateAward({ award_id, toUpdate });

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    res.status(200).json(updatedAward);
  } catch (e) {
    next(e);
  }
});

// GET: /awardlist/:user_id => 해당 유저의 수상 내역 전체 조회
awardRouter.get("/awardlist/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const awardList = await awardService.getAwards({ user_id });

    res.status(200).json(awardList);
  } catch (e) {
    next(e);
  }
});

// DELETE: /awards/:id => id에 해당하는 수상 내역 삭제
awardRouter.delete("/awards/:id", async (req, res, next) => {
  try {
    const award_id = req.params.id;
    const deletedAward = await awardService.deleteAward({ award_id });

    if (deletedAward.deletedCount !== 1) {
      throw new Error("정상적으로 삭제되지 않았습니다.");
    } 

    res.status(200).send("success");
  } catch (e) {
    next(e);
  }
});

export { awardRouter };
