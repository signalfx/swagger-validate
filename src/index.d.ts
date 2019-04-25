declare module "swagger-validate-feat" {
  /**
   *
   * @param candidate - the instance to validate against the defined model
   * @param model - the model to use when validating the object
   * @param models - optional map of model names to models to be used when dereferencing linked models (such as $refs or inherited properties)
   * @returns void - throw ValidationErrors if validate failed
   */
  export function model(candidate:any, model:any, models?:any,options?:any):object;
}
