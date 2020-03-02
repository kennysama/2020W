import { sync } from "glob";
import { Router } from "express";

module.exports = () =>
  sync("**/*.ts", { cwd: `${__dirname}/` })
    .map((filename: string) => require(`./${filename}`))

    .filter((router: Router) => Object.getPrototypeOf(router) == Router)

    .reduce(
      (AcumulatorRouter: Router, nextRouter: Router) =>
        AcumulatorRouter.use(nextRouter),
      Router({ mergeParams: true })
    );