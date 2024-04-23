import { joinArrayWithDifferentLastElement } from "@/utils";

export function useOllama() {
 function modelToDisplayName(modelName: ModelResponse["name"]) {
  return modelName.replace(":latest", "").replace("-uncensored", "");
 }
 function modelIsLatest(modelName: ModelResponse["name"]) {
  return modelName.includes("latest");
 }
 function modelIsUncensored(modelName: ModelResponse["name"]) {
  return modelName.includes("uncensored");
 }
 function specialModelText(modelName: ModelResponse["name"]) {
  const specials = [];
  if (modelIsLatest(modelName)) specials.push("Latest");

  if (modelIsUncensored(modelName)) specials.push("Uncensored");

  return joinArrayWithDifferentLastElement(specials, ", ", " & ");
 }

 return {
  modelToDisplayName,
  modelIsLatest,
  modelIsUncensored,
  specialModelText,
 };
}
